from django.contrib.auth import get_user_model

from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny

from .serializers import AddAvatarSerializer, UserSerializer

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
