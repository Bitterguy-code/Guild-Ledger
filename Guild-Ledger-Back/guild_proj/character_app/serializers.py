from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Character
from user_app.serializers import UserSerializer

class CharacterSerializer(ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Character
        fields = ['name', 'money']