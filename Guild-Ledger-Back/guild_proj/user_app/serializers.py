from rest_framework import serializers
from .models import User
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required = True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Username already exists"
            )
        ]
    )
    email = serializers.EmailField(
        required = True,
        validators = [
            UniqueValidator(
                queryset= User.objects.all(),
                message="Email already in use"
            )
        ]
    )
    
    APIKey = serializers.CharField(
        required = False,
        validators = [
            UniqueValidator(
                queryset=User.objects.all(),
                message="API Key already in use"
            )
        ]
    )
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'APIKey']
        extra_kwargs = {'password': {'write_only':True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user