from operator import truth
from django.db import models
from authentication.models import User
# Create your models here.


class FoodDetails(models.Model):
    posted_by = models.ForeignKey(
        User, on_delete=models.CASCADE)
    requested_by = models.ForeignKey(
        User, related_name="requested_user", blank=True, null=True, on_delete=models.CASCADE)
    food_name = models.CharField(
        max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    photo = models.ImageField(null=True, blank=True,
                              upload_to="FoodPhotos")
    quantity = models.CharField(max_length=255, null=True, blank=True)
    pickup_location = models.CharField(max_length=255, blank=True, null=True)
    posted_date = models.DateField(blank=True, null=True)
    status = models.CharField(
        default="available", max_length=255, blank=True, null=True)

    def __str__(self):
        return str(self.posted_by)
