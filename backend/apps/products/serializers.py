from django.db import transaction

from rest_framework.request import Request
from rest_framework.serializers import ModelSerializer

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
        fields = ('id', 'image',)


class ProductSerializer(ModelSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = ProductModel
        fields = ('id', 'title', 'price', 'size', 'images')


class CommentSerializer(ModelSerializer):
    owner = UserSerializer(required=False)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CommentModel
        fields = ('id', 'text', 'created_at', 'product', 'owner')


class ProductDetailSerializer(ModelSerializer):
    category = CategorySerializer(required=False, read_only=True)
    brand = BrandSerializer(required=False, read_only=True)
    owner = UserSerializer(required=False)
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
        print(request.FILES, 'fffffffffffffffffffffffffffffffffffff')
        print(request.data, 'dddddddddddddddddddddddddddddd')
        brand_id = request.data['brand'].get('id') or None
        category_id = request.data['category'].get('id') or None
        product = ProductModel.objects.create(**validated_data, owner=request.user, category_id=category_id,
                                              brand_id=brand_id)

        for image in request.FILES.getlist('images'):
            serializer = ImageSerializer(data={'image': image})
            serializer.is_valid(raise_exception=True)
            serializer.save(product=product)
        return product
