from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import AllowAny, IsAdminUser

from core.permissions.product_permission import IsOwnerFromSubModelOrAdmin, IsOwnerOrAdmin

from .filters import ProductFilter
from .models import BrandModel, CategoryModel, CommentModel, ProductImagesModel, ProductModel
from .serializers import (
    BrandSerializer,
    CategorySerializer,
    CommentSerializer,
    ImageSerializer,
    ProductDetailSerializer,
    ProductSerializer,
)


class ListProductView(ListAPIView):
    """get products with short info, can filter"""
    serializer_class = ProductSerializer
    queryset = ProductModel.objects.all()
    permission_classes = (AllowAny,)
    filterset_class = ProductFilter


class ListClientProductsView(ListAPIView):
    """get products by client token"""
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        return self.queryset.filter(owner_id=self.request.user.id)


class CreateProductView(CreateAPIView):
    """create product"""
    serializer_class = ProductDetailSerializer


class RetrieveUpdateDestroyProductView(RetrieveUpdateDestroyAPIView):
    """
    get:
        get a product
    patch:
        update text fields of product
    delete:
        remove product
    """
    queryset = ProductModel.objects.all()
    serializer_class = ProductDetailSerializer
    http_method_names = ('get', 'patch', 'delete')

    def get_permissions(self):
        method = self.request.method
        if method == "GET":
            return [AllowAny()]
        return [IsOwnerOrAdmin()]

    def perform_update(self, serializer):
        brand_id = self.request.data.get('brand_id') or None
        category_id = self.request.data.get('category_id') or None
        serializer.save(brand_id=brand_id, category_id=category_id)


class CreateProductImageView(CreateAPIView):
    """add image to product"""
    serializer_class = ImageSerializer
    permission_classes = (IsOwnerFromSubModelOrAdmin,)

    def perform_create(self, serializer):
        product_id = self.kwargs.get('pk')
        serializer.save(product_id=product_id)


class RemoveProductImageView(DestroyAPIView):
    """remove image by id"""
    queryset = ProductImagesModel.objects.all()
    permission_classes = (IsOwnerFromSubModelOrAdmin,)

    def get_serializer(self, *args, **kwargs):
        pass


class ListCreateCategoryView(ListCreateAPIView):
    """
    get:
        get list of categories
    post:
        create category
    """
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        method = self.request.method
        if method == "GET":
            return [AllowAny()]
        return [IsAdminUser()]


class UpdateDestroyCategoryView(UpdateAPIView, DestroyAPIView):
    """
    put:
        update category
    delete:
        remove category
    """
    http_method_names = ('put', 'delete')
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAdminUser,)


class ListCreateBrandView(ListCreateAPIView):
    """
    get:
        get brands
    post:
        create new brand
    """
    queryset = BrandModel.objects.all()
    serializer_class = BrandSerializer

    def get_permissions(self):
        method = self.request.method
        if method == "GET":
            return [AllowAny()]
        return [IsAdminUser()]


class UpdateDestroyBrandView(UpdateAPIView, DestroyAPIView):
    """
    patch:
        update brand
    delete:
        remove brand
    """
    http_method_names = ('patch', 'delete')
    queryset = BrandModel.objects.all()
    serializer_class = BrandSerializer
    permission_classes = (IsAdminUser,)


class CreateCommentView(CreateAPIView):
    """create comment"""
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        user_id = self.request.user.id
        product_id = self.kwargs.get('pk')
        serializer.save(product_id=product_id, owner_id=user_id)


class ListClientCommentsView(ListAPIView):
    """get comments by client token"""
    queryset = CommentModel.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsOwnerOrAdmin,)

    def get_queryset(self):
        user_id = self.request.user.id
        return self.queryset.filter(owner_id=user_id)


class DestroyCommentView(DestroyAPIView):
    """remove comment"""
    queryset = CommentModel.objects.all()
    permission_classes = (IsOwnerOrAdmin,)
