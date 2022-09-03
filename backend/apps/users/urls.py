from django.urls import path

from .views import (  # DestroyUserView,
    GetCurrentUserView,
    ListCreateUsersView,
    RetrieveDestroyUserView,
    UpdateProfileView,
    UserToAdminView,
    UserToLowerView,
)

urlpatterns = [
    path('', ListCreateUsersView.as_view()),
    path('/current', GetCurrentUserView.as_view()),
    path('/profile/update', UpdateProfileView.as_view()),
    path('/<str:pk>/to_admin', UserToAdminView.as_view()),
    path('/<str:pk>/to_lower', UserToLowerView.as_view()),
    path('/<str:pk>/target', RetrieveDestroyUserView.as_view()),
]
