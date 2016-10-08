from django.contrib import admin
from .models import *


# Register your models here.

class MyMealAdmin(admin.ModelAdmin):
    actions = ['delete_models']

    def get_actions(self, request):
        actions = super(MyMealAdmin, self).get_actions(request)
        del actions['delete_selected']
        return actions

    def delete_models(self, request, obj):
        for x in obj.all():
            for y in x.product.all():
                y.delete()
            x.delete()



admin.site.register(MyMeal, MyMealAdmin)
admin.site.register(Product)
