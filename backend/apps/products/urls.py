from django.urls import path

from .views import ListBrandView, ListCategoryView, ListProductView, RetrieveProductView

urlpatterns = [
    path('', ListProductView.as_view()),
    path('/<str:pk>/details', RetrieveProductView.as_view()),
    path('/categories', ListCategoryView.as_view()),
    path('/brands', ListBrandView.as_view())
]
