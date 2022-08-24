from django.urls import path

from .views import (
    CreateCommentView,
    CreateProductView,
    DestroyCommentView,
    DestroyProductView,
    ListBrandView,
    ListCategoryView,
    ListMyCommentsView,
    ListMyProductView,
    ListProductView,
    RetrieveProductView,
    UpdateProductView,
)

urlpatterns = [
    path('', ListProductView.as_view()),
    path('/create', CreateProductView.as_view()),
    path('/<str:pk>/details', RetrieveProductView.as_view()),
    path('/<str:pk>/add_comment', CreateCommentView.as_view()),
    path('/categories', ListCategoryView.as_view()),
    path('/brands', ListBrandView.as_view()),
    path('/user/products', ListMyProductView.as_view()),
    path('/user/comments', ListMyCommentsView.as_view()),
    path('/<str:pk>/remove', DestroyProductView.as_view()),
    path('/<str:pk>/update', UpdateProductView.as_view()),
    path('/comments/<str:pk>/remove', DestroyCommentView.as_view())
]
