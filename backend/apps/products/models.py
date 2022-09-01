from django.contrib.auth import get_user_model
from django.db import models

from .services import brand_upload_to, product_upload_to

UserModel = get_user_model()


class ProductModel(models.Model):
    class Meta:
        db_table = 'product'
        ordering = ('id',)

    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    price = models.PositiveIntegerField()
    color = models.CharField(max_length=50)
    size = models.CharField(max_length=10)
    gender = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey('CategoryModel', models.SET_NULL, 'products', null=True)

    owner = models.ForeignKey(UserModel, models.CASCADE, 'products')
    brand = models.ForeignKey('BrandModel', models.SET_NULL, 'products', null=True)


# todo validate all models

class BrandModel(models.Model):
    class Meta:
        db_table = 'brand'

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to=brand_upload_to, blank=True)


class CommentModel(models.Model):
    class Meta:
        db_table = 'comment'

    text = models.CharField(max_length=255)
    created_at = models.DateField(auto_now_add=True)

    product = models.ForeignKey(ProductModel, models.CASCADE, 'comments')
    owner = models.ForeignKey(UserModel, models.CASCADE, 'my_comments')


class ProductImagesModel(models.Model):
    class Meta:
        db_table = 'images'

    image = models.ImageField(upload_to=product_upload_to)

    product = models.ForeignKey(ProductModel, models.CASCADE, 'images')


class CategoryModel(models.Model):
    class Meta:
        db_table = 'category'

    title = models.CharField(max_length=50)
