from django.urls import path

from .views import (
    CreateCommentView,
    CreateProductImageView,
    CreateProductView,
    DestroyCommentView,
    ListClientCommentsView,
    ListClientProductsView,
    ListCreateBrandView,
    ListCreateCategoryView,
    ListProductView,
    RemoveProductImageView,
    RetrieveUpdateDestroyProductView,
    UpdateDestroyBrandView,
    UpdateDestroyCategoryView,
)

urlpatterns = [
    path('', ListProductView.as_view()),
    path('/client/products', ListClientProductsView.as_view()),
    path('/create', CreateProductView.as_view()),
    path('/<str:pk>/target', RetrieveUpdateDestroyProductView.as_view()),

    path('/<str:pk>/add_image', CreateProductImageView.as_view()),
    path('/images/<str:pk>', RemoveProductImageView.as_view()),

    path('/<str:pk>/add_comment', CreateCommentView.as_view()),
    path('/user/comments', ListClientCommentsView.as_view()),
    path('/comments/<str:pk>', DestroyCommentView.as_view()),

    path('/categories', ListCreateCategoryView.as_view()),
    path('/categories/<str:pk>', UpdateDestroyCategoryView.as_view()),

    path('/brands', ListCreateBrandView.as_view()),
    path('/brands/<str:pk>', UpdateDestroyBrandView.as_view()),
]

