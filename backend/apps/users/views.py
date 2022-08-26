from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    GenericAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    get_object_or_404,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import ProfileSerializer, UserSerializer

UserModel = get_user_model()


class UserCreateView(CreateAPIView):
    """create user"""
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (AllowAny,)


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


class RetrieveUserByEmailView(GenericAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def get(self, *args, **kwargs):
        email = kwargs.get('email')
        user = get_object_or_404(self.get_queryset(), email=email)
        serializer = self.get_serializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class DestroyUserView(DestroyAPIView):
    queryset = UserModel.objects.all()


class UserToAdminView(GenericAPIView):
    # permission_classes = (IsSuperUser,)
    # todo make permission
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    def patch(self, *args, **kwargs):
        candidate = self.get_object()

        if candidate.is_staff:
            raise ValueError('User is already admin')
        candidate.is_staff = True
        candidate.save()

        serializer = self.serializer_class(candidate)
        return Response(serializer.data, status.HTTP_200_OK)


class UserToLowerView(UserToAdminView):
    def patch(self, *args, **kwargs):
        candidate = self.get_object()

        if candidate.is_staff:
            candidate.is_staff = False
            candidate.save()

        serializer = self.serializer_class(candidate)
        return Response(serializer.data, status.HTTP_200_OK)
