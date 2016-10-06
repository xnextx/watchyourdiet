from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    owner = models.ForeignKey(User, null=True, blank=True)
    name = models.CharField(verbose_name="Product name", max_length=1000)
    size = models.IntegerField(verbose_name="Product size")

    class Meta:
        verbose_name_plural = "Products"

    def __str__(self):
        return u"%s" % self.name


class MyMeal(models.Model):
    owner = models.ForeignKey(User, null=True, blank=True)
    product = models.ManyToManyField(Product, related_name="Products")
    name = models.CharField(verbose_name="Meal name", max_length=1000)

    class Meta:
        verbose_name_plural = "Meals"

    def __str__(self):
        return u"%s" % self.name
