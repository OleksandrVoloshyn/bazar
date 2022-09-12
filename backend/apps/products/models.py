from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.db import models

from .enums import RegEx
from .services import brand_upload_to, product_upload_to

UserModel = get_user_model()


class ProductModel(models.Model):
    class Meta:
        db_table = 'product'
        ordering = ('id',)

    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500, blank=True)
    price = models.PositiveIntegerField()
    color = models.CharField(max_length=25, validators=[
        RegexValidator(RegEx.COLOR.pattern, RegEx.COLOR.msg)
    ])
    size = models.CharField(max_length=5)
    gender = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    owner = models.ForeignKey(UserModel, models.CASCADE, 'products')
    category = models.ForeignKey('CategoryModel', models.SET_NULL, 'products', blank=True, null=True)
    brand = models.ForeignKey('BrandModel', models.SET_NULL, 'products', blank=True, null=True)


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

    title = models.CharField(max_length=25)
