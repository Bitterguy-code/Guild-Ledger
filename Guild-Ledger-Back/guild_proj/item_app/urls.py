from django.urls import path
from .views import An_Item, ItemHistoricView, item_search

urlpatterns = [
    path('<str:item_name>', An_Item.as_view(), name='item'),
    path('history/<str:item_name>', ItemHistoricView.as_view(), name='history'),
    path('search/', item_search, name='search')
]