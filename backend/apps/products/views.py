from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from .filters import ProductFilter
from .models import BrandModel, CategoryModel, ProductModel
from .serializers import BrandSerializer, CategorySerializer, ProductDetailSerializer, ProductSerializer


class ListProductView(ListAPIView):
    serializer_class = ProductSerializer
    queryset = ProductModel.objects.all()
    permission_classes = (AllowAny,)
    filterset_class = ProductFilter
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('title', 'description')
    ordering_fields = ('price', 'created_at')

    # def perform_create(self, serializer):
    #     owner = self.request.user
    #     serializer.save(owner=owner)


class RetrieveProductView(RetrieveAPIView):
    queryset = ProductModel.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = ProductDetailSerializer


class ListCategoryView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = CategoryModel.objects.all()
    permission_classes = (AllowAny,)


class ListBrandView(ListAPIView):
    serializer_class = BrandSerializer
    queryset = BrandModel.objects.all()
    permission_classes = (AllowAny,)
