from tokenize import group
from rest_framework import serializers
# from uspl.models import *
from django.contrib.auth.models import Group, Permission
from .models import *
from django.contrib.auth import authenticate
from rest_framework.fields import Field
from django.db.models import Q
from django.contrib.auth.hashers import make_password

# User Serializer


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        password = self.context['request'].data.get("password")
        validated_data['password'] = make_password(password)
        user = super().create(validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=False,
    )

    # group = GroupSerializer(source='group', read_only=True)

    class Meta:
        model = User
        fields = "__all__"


class UserShortSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source="get_full_name")

    class Meta:
        model = User
        fields = ['id', 'full_name', 'first_name',
                  'photo', 'email', 'username', ]


class PasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(min_length=8)
    new_password = serializers.CharField(min_length=8)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
