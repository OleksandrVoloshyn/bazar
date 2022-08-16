from django.urls import path

from .views import GetCurrentUserView, UpdateProfileView, UserCreateView

urlpatterns = [
    path('', UserCreateView.as_view()),
    path('/current', GetCurrentUserView.as_view()),
    path('/profile/update', UpdateProfileView.as_view())
]
