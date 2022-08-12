from django.urls import path

from .views import AddAvatarView, UserCreateView

urlpatterns = [
    path('', UserCreateView.as_view()),
    path('/avatars', AddAvatarView.as_view()),
]
