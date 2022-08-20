from rest_framework.request import Request
from rest_framework.serializers import FileField, ListField, ManyRelatedField, ModelSerializer

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
        fields = ('image',)


class ProductSerializer(ModelSerializer):
    class Meta:
        model = ProductModel
        fields = ('id', 'title', 'price', 'size', 'images')


class ProductDetailSerializer(ModelSerializer):
    category = CategorySerializer(required=False)
    owner = UserSerializer(required=False)
    brand = BrandSerializer(required=False)
    comments = CommentSerializer(read_only=True, many=True)

    # images = ImageSerializer(many=True)
    # images = ListField(child=ImageSerializer(), allow_empty=True)
    # images = ListField(allow_empty=True)
    # images = ListField(child=FileField(max_length=10, allow_empty_file=False, use_url=False))

    class Meta:
        model = ProductModel
        fields = (
            'id', 'title', 'description', 'price', 'color', 'size', 'gender', 'created_at', 'category', 'owner',
            'brand', 'comments', 'images')

    def create(self, validated_data):
        print('[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[')
        print(self.initial_data)
        request: Request = self.context.get('request')
        product = ProductModel.objects.create(**validated_data)
        for image in request.FILES:
            serializer = ImageSerializer(data={'image': request.FILES[image]})
            serializer.is_valid(raise_exception=True)
            serializer.save(product=product)
        return product
