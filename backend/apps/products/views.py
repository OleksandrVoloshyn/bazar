from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import GenericAPIView, ListAPIView, ListCreateAPIView, RetrieveAPIView
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny

from .filters import ProductFilter
from .models import BrandModel, CategoryModel, ProductModel
from .serializers import BrandSerializer, CategorySerializer, ProductDetailSerializer, ProductSerializer


class ListProductView(ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = ProductModel.objects.all()
    permission_classes = (AllowAny,)
    filterset_class = ProductFilter
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('title', 'description')
    ordering_fields = ('price', 'created_at')
    # parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        print(self.request.data.getlist('images'))
        serializer.save(owner_id=self.request.user.id)


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


class ListMyProductView(ListAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        return self.queryset.filter(owner_id=user_id)
