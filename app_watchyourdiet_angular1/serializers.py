# Tutaj są klasy przekształcające obiekty z bazy do postaci w Rest Frameworku
from rest_framework import serializers
from .models import *


class MyMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyMeal
        # fields = ('name_sheet', 'Pricing_for_the_selected_date') #Widoczne pola

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # fields = ('name_sheet', 'Pricing_for_the_selected_date') #Widoczne pola
