from django.urls import path

from .views import (
    CreateCommentView,
    CreateProductView,
    ListBrandView,
    ListCategoryView,
    ListMyProductView,
    ListProductView,
    RetrieveProductView,
)

urlpatterns = [
    path('', ListProductView.as_view()),
    path('/create', CreateProductView.as_view()),
    path('/<str:pk>/details', RetrieveProductView.as_view()),
    path('/<str:pk>/add_comment', CreateCommentView.as_view()),
    path('/categories', ListCategoryView.as_view()),
    path('/brands', ListBrandView.as_view()),
    path('/user/products', ListMyProductView.as_view())
]
