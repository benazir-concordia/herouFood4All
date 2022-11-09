from rest_framework import serializers
from authentication.serializers import UserSerializer
from .models import *


class FoodDetailsSerializer(serializers.ModelSerializer):

    posted_by_obj = UserSerializer(source='posted_by', read_only=True)
    requested_by_obj = UserSerializer(source='requested_by', read_only=True)

    class Meta:
        model = FoodDetails
        fields = "__all__"
