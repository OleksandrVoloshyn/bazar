from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    GenericAPIView,
    ListAPIView,
    ListCreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from core.permissions.user_permission import IsOwnerOrAdmin

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
    serializer_class = ProductSerializer
    queryset = ProductModel.objects.all()
    permission_classes = (AllowAny,)
    filterset_class = ProductFilter


class ListMyProductView(ListAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        return self.queryset.filter(owner_id=user_id)


class CreateProductView(CreateAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductDetailSerializer

    def perform_create(self, serializer):
        # todo передавати зразу айдішки
        brand = BrandModel.objects.get(name__icontains=self.request.data['brand'])
        category = CategoryModel.objects.get(title__icontains=self.request.data['category'])
        serializer.save(owner_id=self.request.user.id, brand=brand, category=category)


class RetrieveProductView(RetrieveAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = (AllowAny,)


# todo Reatrive update destroy nedd to combine
class DestroyProductView(DestroyAPIView):
    queryset = ProductModel.objects.all()
    permission_classes = (IsOwnerOrAdmin,)


class UpdateProductView(UpdateAPIView):
    http_method_names = ('put',)
    queryset = ProductModel.objects.all()
    permission_classes = (IsOwnerOrAdmin,)
    serializer_class = ProductDetailSerializer

    def perform_update(self, serializer):
        brand = BrandModel.objects.get(name__icontains=self.request.data['brand'])
        category = CategoryModel.objects.get(title__icontains=self.request.data['category'])
        # todo передавати зразу айдішки
        serializer.save(brand=brand, category=category)


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
        if method == "POST":
            return [IsAdminUser()]


class UpdateDestroyCategoryView(UpdateAPIView, DestroyAPIView):
    """
    put:
        change category title
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
        get brand
    post:
        create new brand
    """
    queryset = BrandModel.objects.all()
    serializer_class = BrandSerializer

    def get_permissions(self):
        method = self.request.method
        if method == "GET":
            return [AllowAny()]
        if method == "POST":
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
    queryset = CommentModel.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        user_id = self.request.user.id
        product_id = self.kwargs.get('pk')
        serializer.save(product_id=product_id, owner_id=user_id)


class ListMyCommentsView(ListAPIView):
    queryset = CommentModel.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        return self.queryset.filter(owner_id=user_id)


class DestroyCommentView(DestroyAPIView):
    queryset = CommentModel.objects.all()
    permission_classes = (IsOwnerOrAdmin,)


class DestroyProductImage(DestroyAPIView):
    queryset = ProductImagesModel.objects.all()


class CreateProductImage(GenericAPIView):
    queryset = ProductImagesModel.objects.all()
    serializer_class = ImageSerializer

    def post(self, *args, **kwargs):
        product_id = kwargs.get('pk')
        image = self.request.FILES.getlist('file')[0]
        serializer = self.serializer_class(data={'image': image})
        serializer.is_valid(raise_exception=True)
        serializer.save(product_id=product_id)
        return Response(serializer.data, status=status.HTTP_200_OK)
#     todo try change filelist to file on front
