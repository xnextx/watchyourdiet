from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient
from .models import *


# Create your tests here.
class MyMealTestCase(TestCase):
    def setUp(self):
        self.api = APIClient()
        password = "dupa"
        self.my_admin = User.objects.create_superuser('admin', 'myemail@test.com', password)
        self.my_client = User.objects.create_user('client', 'myemail@test.com', password)
    #
    def test_post_one_meal(self):
        self.api.force_authenticate(user=self.my_admin)

        response = self.api.post('/api/v1/MyMeal/', {
            "owner": 1,
            "name": "Dinner",
            "product": [{
                "name": "Egg",
                "size": 1,
                "owner": 1
            }]
        }, format='json')

        self.assertTrue(MyMeal.objects.get(name="Dinner"))
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)


    def test_post_one_meal_without_product1(self):
        self.api.force_authenticate(user=self.my_admin)

        response = self.api.post('/api/v1/MyMeal/', {
            "owner": 1,
            "name": "Dinner",
            "product": None #Edited
        }, format='json')

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_post_one_meal_without_product2(self):
        self.api.force_authenticate(user=self.my_admin)

        response = self.api.post('/api/v1/MyMeal/', {
            "owner": 1,
            "name": "Dinner",
            "product": {} #Edited
        }, format='json')

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_one_meal_without_product3(self):
        self.api.force_authenticate(user=self.my_admin)

        response = self.api.post('/api/v1/MyMeal/', {
            "owner": 1,
            "name": "Dinner",
            "product": [''] #Edited
        }, format='json')

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

