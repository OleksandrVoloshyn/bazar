from rest_framework.serializers import ModelSerializer

from apps.users.serializers import UserSerializer

from .models import BrandModel, CategoryModel, CommentModel, ProductModel


class BrandSerializer(ModelSerializer):
    class Meta:
        model = BrandModel
        fields = ('id', 'name', 'description', 'image')


class CommentSerializer(ModelSerializer):
    class Meta:
        model = CommentModel
        fields = ('id', 'text', 'created_at', 'product', 'owner')


class CategorySerializer(ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ('id', 'title')


class ProductSerializer(ModelSerializer):
    class Meta:
        model = ProductModel
        fields = ('id', 'title', 'price', 'size', 'images')
