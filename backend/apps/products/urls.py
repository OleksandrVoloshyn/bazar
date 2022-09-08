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
    path('', ListProductView.as_view(), name='products_list'),
    path('/client/products', ListClientProductsView.as_view(), name='products_clients_prod_list'),
    path('/create', CreateProductView.as_view(), name='products_create'),
    path('/<str:pk>/target', RetrieveUpdateDestroyProductView.as_view(), name='products_retrieve_update_destroy'),

    path('/<str:pk>/add_image', CreateProductImageView.as_view(), name='products_add_image'),
    path('/images/<str:pk>', RemoveProductImageView.as_view(), name='products_remove_image'),

    path('/<str:pk>/add_comment', CreateCommentView.as_view(), name='products_create_comment'),
    path('/user/comments', ListClientCommentsView.as_view(), name='products_clients_comment_list'),
    path('/comments/<str:pk>', DestroyCommentView.as_view(), name='products_remove_comment'),

    path('/categories', ListCreateCategoryView.as_view(), name='products_list_create_category'),
    path('/categories/<str:pk>', UpdateDestroyCategoryView.as_view(), name='products_update_destroy_category'),

    path('/brands', ListCreateBrandView.as_view(), name='products_list_create_brand'),
    path('/brands/<str:pk>', UpdateDestroyBrandView.as_view(), name='products_update_destroy_brand'),
]
