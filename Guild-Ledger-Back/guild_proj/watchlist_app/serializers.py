from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from item_app.serializers import ItemSerializer
from .models import Watchlist, Watchlist_item

class WatchlistItemSerializer(ModelSerializer):
    item = ItemSerializer()
    
    class Meta:
        model = Watchlist_item
        fields = ['id','item', 'sell_point', 'buy_point']
        
class WatchlistSerializer(ModelSerializer):
    watchlist_items = WatchlistItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Watchlist
        fields = ['id','watchlist_items']