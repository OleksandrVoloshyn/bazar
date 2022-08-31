from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.generics import DestroyAPIView, GenericAPIView, ListCreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from core.permissions.user_permission import IsSuperUser

from .serializers import ProfileSerializer, UserSerializer

UserModel = get_user_model()


# todo check swagger
class ListCreateUsersView(ListCreateAPIView):
    """
    GET search users for changing
    POST create user
    """
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    filter_backends = (SearchFilter,)
    search_fields = ('email', 'profile__name', 'profile__surname')

    def get_permissions(self):
        method = self.request.method
        if method == "POST":
            return [AllowAny()]
        if method == "GET":
            return [IsAdminUser()]


class UpdateProfileView(UpdateAPIView):
    """update profile"""
    http_method_names = ('patch',)
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile


class GetCurrentUserView(GenericAPIView):
    """get current user"""
    serializer_class = UserSerializer

    def get(self, *args, **kwargs):
        serializer = self.serializer_class(self.request.user)
        return Response(serializer.data, status.HTTP_200_OK)


class DestroyUserView(DestroyAPIView):
    """remove user"""
    queryset = UserModel.objects.all()
    permission_classes = (IsAdminUser,)


class UserToAdminView(GenericAPIView):
    """give admin power"""
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsSuperUser,)

    def patch(self, *args, **kwargs):
        candidate = self.get_object()
        if not candidate.is_staff:
            candidate.is_staff = True
            candidate.save()

        serializer = self.serializer_class(candidate)
        return Response(serializer.data, status.HTTP_200_OK)


class UserToLowerView(UserToAdminView):
    """remove admin power """

    def patch(self, *args, **kwargs):
        candidate = self.get_object()
        if candidate.is_staff:
            candidate.is_staff = False
            candidate.save()

        serializer = self.serializer_class(candidate)
        return Response(serializer.data, status.HTTP_200_OK)
