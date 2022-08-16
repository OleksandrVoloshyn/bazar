from django.urls import path

from .views import ListCreateProductView

urlpatterns = [
    path('', ListCreateProductView.as_view())
]
