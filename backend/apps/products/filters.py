from django.db.models import Q

from django_filters import rest_framework as filters

from .models import ProductModel


class ProductFilter(filters.FilterSet):
    price_gt = filters.NumberFilter(field_name='price', lookup_expr='gt')
    price_lt = filters.NumberFilter(field_name='price', lookup_expr='lt')
    category = filters.CharFilter(field_name='category__title', lookup_expr='icontains')
    brand = filters.CharFilter(field_name='brand__name', lookup_expr='icontains')
    ordering = filters.OrderingFilter(fields=('price', 'created_at'))
    search = filters.CharFilter(method='my_search_filter', label='search')

    class Meta:
        model = ProductModel
        fields = ('price_gt', 'price_lt', 'color', 'size', 'gender', 'brand', 'category', 'ordering', 'search')

    @staticmethod
    def my_search_filter(queryset, name, value):
        """search by title or description"""
        return queryset.filter(Q(title=value) | Q(description=value))
