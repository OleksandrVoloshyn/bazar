from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny

from .filters import ProductFilter
from .models import BrandModel, CategoryModel, ProductModel
from .serializers import BrandSerializer, CategorySerializer, ProductSerializer


class ListCreateProductView(ListAPIView):
    serializer_class = ProductSerializer
    queryset = ProductModel.objects.all()
    permission_classes = (AllowAny,)
    filterset_class = ProductFilter

    def perform_create(self, serializer):
        owner = self.request.user
        serializer.save(owner=owner)


class ListCategoryView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = CategoryModel.objects.all()
    permission_classes = (AllowAny,)


class ListBrandView(ListAPIView):
    serializer_class = BrandSerializer
    queryset = BrandModel.objects.all()
    permission_classes = (AllowAny,)
