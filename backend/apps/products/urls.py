from django.urls import path

from .views import (
    CreateBrandView,
    CreateCommentView,
    CreateProductImage,
    CreateProductView,
    DestroyBrandView,
    DestroyCommentView,
    DestroyProductImage,
    DestroyProductView,
    ListBrandView,
    ListCreateCategoryView,
    ListMyCommentsView,
    ListMyProductView,
    ListProductView,
    RetrieveProductView,
    UpdateDestroyCategoryView,
    UpdateProductView,
)

urlpatterns = [
    path('', ListProductView.as_view()),
    path('/create', CreateProductView.as_view()),
    path('/<str:pk>/details', RetrieveProductView.as_view()),
    path('/user/products', ListMyProductView.as_view()),
    path('/<str:pk>/remove', DestroyProductView.as_view()),
    path('/<str:pk>/update', UpdateProductView.as_view()),

    path('/<str:pk>/add_comment', CreateCommentView.as_view()),
    path('/user/comments', ListMyCommentsView.as_view()),
    path('/comments/<str:pk>/remove', DestroyCommentView.as_view()),

    path('/categories', ListCreateCategoryView.as_view()),
    path('/categories/<str:pk>', UpdateDestroyCategoryView.as_view()),

    path('/brands', ListBrandView.as_view()),
    path('/brands/<str:pk>/remove', DestroyBrandView.as_view()),
    path('/brands/create', CreateBrandView.as_view()),

    path('/images/<str:pk>/remove', DestroyProductImage.as_view()),
    path('/<str:pk>/add_image', CreateProductImage.as_view()),
]
