from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Character
from user_app.serializers import UserSerializer
from item_app.serializers import ItemSerializer

class CharacterSerializer(ModelSerializer):
    user = UserSerializer()
    items = ItemSerializer(many=True)
    
    class Meta:
        model = Character
        fields = ['name', 'items', 'user']