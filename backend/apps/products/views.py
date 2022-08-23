from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView, ListCreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from .filters import ProductFilter
from .models import BrandModel, CategoryModel, CommentModel, ProductModel
from .serializers import (
    BrandSerializer,
    CategorySerializer,
    CommentSerializer,
    ProductDetailSerializer,
    ProductSerializer,
)


class ListProductView(ListAPIView):
    serializer_class = ProductSerializer
    queryset = ProductModel.objects.all()
    permission_classes = (AllowAny,)
    filterset_class = ProductFilter


class CreateProductView(CreateAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductDetailSerializer

    def perform_create(self, serializer):
        serializer.save(owner_id=self.request.user.id)


class RetrieveProductView(RetrieveAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = (AllowAny,)


class ListCategoryView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = CategoryModel.objects.all()
    permission_classes = (AllowAny,)


class ListBrandView(ListAPIView):
    serializer_class = BrandSerializer
    queryset = BrandModel.objects.all()
    permission_classes = (AllowAny,)


class ListMyProductView(ListAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        return self.queryset.filter(owner_id=user_id)


class CreateCommentView(CreateAPIView):
    queryset = CommentModel.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        user_id = self.request.user.id
        product_id = self.kwargs.get('pk')
        serializer.save(product_id=product_id, owner_id=user_id)
