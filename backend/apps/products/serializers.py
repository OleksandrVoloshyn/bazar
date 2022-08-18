from rest_framework.serializers import ModelSerializer

from apps.users.serializers import UserSerializer

from .models import BrandModel, CategoryModel, CommentModel, ProductImagesModel, ProductModel


class BrandSerializer(ModelSerializer):
    class Meta:
        model = BrandModel
        fields = ('id', 'name', 'description', 'image')


class CommentSerializer(ModelSerializer):
    owner = UserSerializer()

    class Meta:
        model = CommentModel
        # fields = ('id', 'text', 'created_at', 'product', 'owner')
        fields = ('id', 'text', 'owner', 'created_at')


class CategorySerializer(ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ('id', 'title')


class ImageSerializer(ModelSerializer):
    class Meta:
        model = ProductImagesModel
        fields = ('id', 'image')


class ProductSerializer(ModelSerializer):
    class Meta:
        model = ProductModel
        fields = ('id', 'title', 'price', 'size', 'images')


class ProductDetailSerializer(ModelSerializer):
    category = CategorySerializer()
    owner = UserSerializer()
    brand = BrandSerializer()
    comments = CommentSerializer(read_only=True, many=True)
    images = ImageSerializer(many=True)

    class Meta:
        model = ProductModel
        fields = (
            'id', 'title', 'description', 'price', 'color', 'size', 'gender', 'created_at', 'category', 'owner',
            'brand', 'comments', 'images')
