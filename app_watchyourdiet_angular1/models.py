from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    owner = models.ForeignKey(User, null=True, blank=True)
    name = models.CharField(verbose_name="Product name", max_length=1000)
    size = models.IntegerField(verbose_name="Product size")
    mymeal = models.ManyToManyField('MyMeal', related_name="My_Meals", null=True, blank=True)

    class Meta:
        verbose_name_plural = "Products"

    def delete(self, *args, **kwargs):
        if self.mymeal.count() <= 1:
            super(Product, self).delete(*args, **kwargs)

    def __str__(self):
        return u"%s" % self.name


class MyMeal(models.Model):
    owner = models.ForeignKey(User, null=True, blank=True)
    product = models.ManyToManyField(Product, related_name="Products")
    name = models.CharField(verbose_name="Meal name", max_length=1000)

    class Meta:
        verbose_name_plural = "Meals"

    def delete(self):
        if self:
            for product in self.product.all():
                product.delete()
        super(MyMeal, self).delete()

    def __str__(self):
        return u"%s" % self.name

