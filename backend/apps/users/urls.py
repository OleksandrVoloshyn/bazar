from django.urls import path

from .views import (
    DestroyUserView,
    GetCurrentUserView,
    GetUserByEmailView,
    UpdateProfileView,
    UserCreateView,
    UserToAdminView,
    UserToLowerView,
)

urlpatterns = [
    path('', UserCreateView.as_view()),
    path('/current', GetCurrentUserView.as_view()),
    path('/<str:email>', GetUserByEmailView.as_view()),

    path('/profile/update', UpdateProfileView.as_view()),
    path('/<str:pk>/to_admin', UserToAdminView.as_view()),
    path('/<str:pk>/to_lower', UserToLowerView.as_view()),
    path('/<str:pk>/remove', DestroyUserView.as_view()),
]
