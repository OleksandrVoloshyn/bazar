from django.urls import path

from .views import ListBrandView, ListCategoryView, ListCreateProductView

urlpatterns = [
    path('', ListCreateProductView.as_view()),
    path('/categories', ListCategoryView.as_view()),
    path('/brands', ListBrandView.as_view())
]
