from .views import Watchlist_manager
from django.urls import path

urlpatterns = [
    path('', Watchlist_manager.as_view(), name='watchlist'),
    path('modify/<int:item_id>/', Watchlist_manager.as_view(), name='add'),
    path('delete/<int:watchlist_item_id>/', Watchlist_manager.as_view(), name='delete')
]