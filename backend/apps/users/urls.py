from django.urls import path

from .views import (
    GetCurrentUserView,
    ListCreateUsersView,
    RetrieveDestroyUserView,
    UpdateProfileView,
    UserToAdminView,
    UserToLowerView,
)

urlpatterns = [
    path('', ListCreateUsersView.as_view(), name='users_list_create'),
    path('/current', GetCurrentUserView.as_view(), name='users_retrieve_current'),
    path('/profile/update', UpdateProfileView.as_view(), name='users_profile_update'),
    path('/<str:pk>/to_admin', UserToAdminView.as_view(), name='users_to_admin'),
    path('/<str:pk>/to_lower', UserToLowerView.as_view(), name='users_to_lower'),
    path('/<str:pk>/target', RetrieveDestroyUserView.as_view(), name='users_retrieve_destroy'),
]
