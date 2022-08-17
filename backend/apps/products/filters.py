from django_filters import rest_framework as filters

from .models import ProductModel


class ProductFilter(filters.FilterSet):
    price_gt = filters.NumberFilter(field_name='price', lookup_expr='gt')
    price_lt = filters.NumberFilter(field_name='price', lookup_expr='lt')
    category = filters.CharFilter(field_name='category', lookup_expr='title')
    brand = filters.CharFilter(field_name='brand', lookup_expr='name')

    class Meta:
        model = ProductModel
        fields = ('price_gt', 'price_lt', 'color', 'size', 'gender', 'brand', 'category')
