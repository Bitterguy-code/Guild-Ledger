from rest_framework.serializers import ModelSerializer
from .models import Character
from user_app.serializers import UserSerializer
from item_app.serializers import ItemSerializer
from watchlist_app.serializers import WatchlistSerializer

class CharacterSerializer(ModelSerializer):
    user = UserSerializer()
    items = ItemSerializer(many=True)
    watchlist = WatchlistSerializer(read_only=True)
    
    class Meta:
        model = Character
        fields = ['id','name', 'items', 'user', 'watchlist']