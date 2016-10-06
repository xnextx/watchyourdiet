from rest_framework import viewsets, permissions, filters
from .models import *
from .serializers import *
from rest_framework.permissions import DjangoModelPermissions, IsAuthenticated

class MyMealViewSet(viewsets.ModelViewSet):
    queryset = MyMeal.objects.all()
    model = MyMeal
    serializer_class = MyMealSerializer
    permission_classes = (DjangoModelPermissions, )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return MyMeal.objects.filter(owner=self.request.user)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    model = Product
    serializer_class = ProductSerializer
    permission_classes = (DjangoModelPermissions, )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)