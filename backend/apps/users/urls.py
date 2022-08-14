from django.urls import path

from .views import AddAvatarView, GetCurrentUserView, UpdateProfile, UserCreateView

urlpatterns = [
    path('', UserCreateView.as_view()),
    path('/avatars', AddAvatarView.as_view()),
    path('/current', GetCurrentUserView.as_view()),
    path('/profile/update', UpdateProfile.as_view())
]
