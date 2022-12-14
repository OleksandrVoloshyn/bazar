# Generated by Django 4.1 on 2022-09-05 08:50

import django.core.validators
from django.db import migrations, models

import apps.products.services


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BrandModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(blank=True, max_length=255)),
                ('image', models.ImageField(blank=True, upload_to=apps.products.services.brand_upload_to)),
            ],
            options={
                'db_table': 'brand',
            },
        ),
        migrations.CreateModel(
            name='CategoryModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=25)),
            ],
            options={
                'db_table': 'category',
            },
        ),
        migrations.CreateModel(
            name='CommentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255)),
                ('created_at', models.DateField(auto_now_add=True)),
            ],
            options={
                'db_table': 'comment',
            },
        ),
        migrations.CreateModel(
            name='ProductImagesModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=apps.products.services.product_upload_to)),
            ],
            options={
                'db_table': 'images',
            },
        ),
        migrations.CreateModel(
            name='ProductModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, max_length=500)),
                ('price', models.PositiveIntegerField()),
                ('color', models.CharField(max_length=25, validators=[django.core.validators.RegexValidator('^[a-zA-Z??-??????????????????????]{2,25}$', 'only letters min 2 max 25 ch')])),
                ('size', models.CharField(max_length=5)),
                ('gender', models.CharField(max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('brand', models.ForeignKey(blank=True, on_delete=models.SET(''), related_name='products', to='products.brandmodel')),
                ('category', models.ForeignKey(blank=True, on_delete=models.SET(''), related_name='products', to='products.categorymodel')),
            ],
            options={
                'db_table': 'product',
                'ordering': ('id',),
            },
        ),
    ]
