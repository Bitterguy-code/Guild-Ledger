from django.urls import path
from .views import An_Item

urlpatterns = [
    path('', An_Item.as_view(), name='item')
]