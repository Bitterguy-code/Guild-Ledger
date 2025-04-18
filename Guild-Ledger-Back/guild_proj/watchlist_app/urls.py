from .views import Watchlist_manager
from django.urls import path

urlpatterns = [
    path('', Watchlist_manager.as_view(), name='watchlist'),
    path('add/<int:watchlist_item_id>', Watchlist_manager.as_view(), name='add'),
    path('modify/<int:watchlist_item_id/>', Watchlist_manager.as_view(), name='modify'),
    path('delete/<int:watchlist_item_id>/', Watchlist_manager.as_view(), name='delete')
]