from django.urls import path

from .views import GetCurrentUserView, UpdateProfile, UserCreateView

urlpatterns = [
    path('', UserCreateView.as_view()),
    path('/current', GetCurrentUserView.as_view()),
    path('/profile/update', UpdateProfile.as_view())
]
