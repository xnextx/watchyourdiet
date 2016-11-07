from django.contrib import admin
from .models import *
from django.db.models import Count


# Register your models here.




class MyMealAdmin(admin.ModelAdmin):
    actions = ['delete_models']

    def get_actions(self, request):
        actions = super(MyMealAdmin, self).get_actions(request)
        del actions['delete_selected']
        return actions

    def delete_models(self, request, obj):
        keywords_list = Product.objects.all().annotate(count=Count('name'))
        # keywords_list = MyMeal.objects.all().annotate(key_count=Count('product_set'))

        for mymeal in obj.all():
            for product in mymeal.product.all():
                product.count = MyMeal.objects.filter(product=product).count()

        for x in obj.all():
            for y in x.product.all():
                # print("==========")
                # print(y)
                # print(dir(y))
                # print(dir(y.mymeal))
                # print(y.mymeal.count())
                # print("==========")
                # if y.mymeal.count() <= 1:
                #     print("Można skasować produkt")
                #     Product.objects.get(id=y.id).delete()
                y.delete()
            x.delete()


admin.site.register(MyMeal, MyMealAdmin)
admin.site.register(Product)
