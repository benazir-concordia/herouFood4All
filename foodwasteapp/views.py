from datetime import datetime, timedelta
import io
from django.shortcuts import render
from .models import *
from rest_framework import viewsets, permissions, generics
from .serializers import *
from authentication.models import User
from django.db.models import Q
from rest_framework import permissions
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import generics, mixins
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from rest_framework.filters import OrderingFilter, SearchFilter

# Create your views here.


class FoodAPI(generics.GenericAPIView,
              mixins.ListModelMixin,
              mixins.RetrieveModelMixin,
              mixins.CreateModelMixin,
              mixins.UpdateModelMixin,
              mixins.DestroyModelMixin
              ):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = FoodDetailsSerializer
    queryset = FoodDetails.objects.all()
    lookup_field = "id"
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    # filter_class =
    ordering_fields = [
        'food_name',
    ]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request, id)
        else:
            return self.list(request)

    def post(self, request):
        return self.create(request)

    def put(self, request, id=None):
        return self.partial_update(request, id)

    def delete(self, request, id=None):
        return self.destroy(request, id)


class PostedFoodAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, *args, **kwargs):
        if not request.user.groups.all():
            return Response(None)
        # all requested food by requested donor
        if request.GET.get('type') == "requested_food":
            fooddetails = FoodDetails.objects.filter(
                ~Q(status="available"), requested_by=request.user)

            foodDetails_serializer = FoodDetailsSerializer(
                fooddetails, many=True)
            return Response(foodDetails_serializer.data)

        # donor's posted foods (delete delivered food which has been requested)
        if (request.user.groups.all()[0].id == 1):
            fooddetails = FoodDetails.objects.filter(
                posted_by=request.user).order_by('-posted_date')

        # all currently available foods
        else:
            date_from = datetime.now() - timedelta(days=1)
            fooddetails = FoodDetails.objects.filter(
                status="available", posted_date__gte=date_from).order_by('-posted_date')

        foodDetails_serializer = FoodDetailsSerializer(
            fooddetails, many=True)
        return Response(foodDetails_serializer.data)


class ExposeAPI(APIView):

    def get(self, request, type, *args, **kwargs):
        # all currently requested foods
        if type == "all_currently_requested_food":
            fooddetails = FoodDetails.objects.filter(status="requested")
            foodDetails_serializer = FoodDetailsSerializer(
                fooddetails, many=True)
        # all currently available foods
        elif type == "all_currently_available_food":
            date_from = datetime.now() - timedelta(days=1)
            fooddetails = FoodDetails.objects.filter(
                status="available", posted_date__gte=date_from)
            foodDetails_serializer = FoodDetailsSerializer(
                fooddetails, many=True)
        # all expired/wasted foods
        elif type == "all_expired_food":
            date_from = datetime.now() - timedelta(days=1)
            fooddetails = FoodDetails.objects.filter(
                status="available", posted_date__lte=date_from)
            foodDetails_serializer = FoodDetailsSerializer(
                fooddetails, many=True)
        # all listed donors
        elif type == "all_listed_donors":
            user_details = User.objects.filter(
                groups__name="Donor")
            foodDetails_serializer = UserSerializer(
                user_details, many=True)

        return Response(foodDetails_serializer.data)
