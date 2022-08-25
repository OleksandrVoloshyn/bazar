from django.db import transaction

from rest_framework.request import Request
from rest_framework.serializers import FileField, ListField, ManyRelatedField, ModelSerializer

from apps.users.serializers import UserSerializer

from .models import BrandModel, CategoryModel, CommentModel, ProductImagesModel, ProductModel


class BrandSerializer(ModelSerializer):
    class Meta:
        model = BrandModel
        fields = ('id', 'name', 'description', 'image')


class CategorySerializer(ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ('id', 'title')


class ImageSerializer(ModelSerializer):
    class Meta:
        model = ProductImagesModel
        fields = ('id','image',)


class ProductSerializer(ModelSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = ProductModel
        fields = ('id', 'title', 'price', 'size', 'images')


class CommentSerializer(ModelSerializer):
    owner = UserSerializer(required=False)
    product = ProductSerializer(read_only=True, required=False)

    class Meta:
        model = CommentModel
        fields = ('id', 'text', 'created_at', 'product', 'owner')


class ProductDetailSerializer(ModelSerializer):
    category = CategorySerializer(required=False)
    owner = UserSerializer(required=False)
    brand = BrandSerializer(required=False)
    comments = CommentSerializer(read_only=True, many=True)
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = ProductModel
        fields = (
            'id', 'title', 'description', 'price', 'color', 'size', 'gender', 'created_at', 'category', 'owner',
            'brand', 'comments', 'images')

    @transaction.atomic
    def create(self, validated_data):
        request: Request = self.context.get('request')
        product = ProductModel.objects.create(**validated_data)
        for image in request.FILES.getlist('images'):
            serializer = ImageSerializer(data={'image': image})
            serializer.is_valid(raise_exception=True)
            serializer.save(product=product)
        return product
