# Tutaj są klasy przekształcające obiekty z bazy do postaci w Rest Frameworku
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from .models import *


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # fields = ('name_sheet', 'Pricing_for_the_selected_date') #Widoczne pola

class MyMealSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=True, required=True)

    class Meta:
        model = MyMeal
        fields = ('pk', 'owner', 'name', 'product')  # Widoczne pola

    def validate_product(self, attrs):
        if(attrs == []):
            raise serializers.ValidationError("products can't be []")

    def create(self, validated_data):
        # current_user = serializers.CurrentUserDefault()  # <= magic!
        user = self.context['request'].user
        products_data = validated_data.pop('product')
        mymeal = MyMeal.objects.create(**validated_data)
        if(products_data):
            print("=========")
            print(products_data)
            print("=========")
            for product in products_data:
                produc = Product.objects.create(owner=user,name=product['name'], size=product['size'])
                mymeal.product.add(produc)
        return mymeal


