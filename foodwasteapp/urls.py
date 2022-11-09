from django.urls import path
from knox import views as knox_views
from .views import *

app_name = 'foodwasteapp'
urlpatterns = [
    path('food/', FoodAPI.as_view()),
    path('food/<int:id>', FoodAPI.as_view()),
    path('get_posted_food/', PostedFoodAPI.as_view()),

]
