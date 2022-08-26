import os
from uuid import uuid1


def brand_upload_to(instance, file: str):
    ext = file.split('.')[-1]
    return os.path.join('brands', f'{uuid1()}.{ext}')


def product_upload_to(instance, file: str):
    ext = file.split('.')[-1]
    return os.path.join(instance.product.title, 'images', f'{uuid1()}.{ext}')
