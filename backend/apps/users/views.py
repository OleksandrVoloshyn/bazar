from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import AddAvatarSerializer, ProfileSerializer, UserSerializer

UserModel = get_user_model()


class UserCreateView(CreateAPIView):
    """create user"""
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (AllowAny,)


class AddAvatarView(UpdateAPIView):
    """add images to user's profile"""
    http_method_names = ('patch',)
    serializer_class = AddAvatarSerializer

    def get_object(self):
        return self.request.user.profile


class UpdateProfile(UpdateAPIView):
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
