from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveDestroyAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from core.permissions.user_permission import IsSuperUser

from .serializers import ProfileSerializer, UserSerializer

UserModel = get_user_model()


class ListCreateUsersView(ListCreateAPIView):
    """
    get:
        search users by email, name or surname
    post:
        create user
    """
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    filter_backends = (SearchFilter,)
    search_fields = ('email', 'profile__name', 'profile__surname')

    def get_queryset(self):
        return self.queryset.exclude(id=self.request.user.id)

    def get_permissions(self):
        method = self.request.method
        if method == "GET":
            return [IsAdminUser()]
        return [AllowAny()]


class UpdateProfileView(UpdateAPIView):
    """update profile"""
    http_method_names = ('patch',)
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile


class GetCurrentUserView(GenericAPIView):
    """get current user from token"""
    serializer_class = UserSerializer

    def get(self, *args, **kwargs):
        serializer = self.serializer_class(self.request.user)
        return Response(serializer.data, status.HTTP_200_OK)


class RetrieveDestroyUserView(RetrieveDestroyAPIView):
    """
    get:
        get user
    delete:
        remove user
    """
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        method = self.request.method
        if method == "DELETE":
            return [IsAdminUser()]
        return [AllowAny()]


class UserToAdminView(GenericAPIView):
    """grant admin power"""
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
