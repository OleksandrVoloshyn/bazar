from django.contrib.auth import get_user_model
from django.db import transaction

from rest_framework.serializers import ModelSerializer, ValidationError

from core.services.email_service import EmailService

from .models import ProfileModel

UserModel = get_user_model()


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = ProfileModel
        exclude = ('user',)

    @staticmethod
    def validate_name(value):
        name: str = value
        if 'admin' == name.lower():
            raise ValidationError('Forbidden name, contains admin')
        return value


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = UserModel
        fields = (
            'id', 'email', 'password', 'is_staff', 'is_superuser', 'is_active', 'last_login', 'created_at',
            'updated_at', 'profile'
        )
        read_only_fields = ('id', 'is_staff', 'is_superuser', 'is_active', 'last_login', 'created_at',
                            'updated_at', 'profile')
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    @staticmethod
    def validate_profile(value):
        name: str = value['name']
        if 'admin' in name.lower():
            raise ValidationError('Forbidden name, contains admin')
        return value

    @transaction.atomic
    def create(self, validated_data: dict):
        profile = validated_data.pop('profile')
        user = UserModel.objects.create_user(**validated_data)
        ProfileModel.objects.create(**profile, user=user)
        EmailService.register_email(user)
        return user
