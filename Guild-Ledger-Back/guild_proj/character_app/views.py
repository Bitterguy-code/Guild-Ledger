from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from .models import Character
from .serializers import CharacterSerializer

# Create your views here.
class CharacterView(APIView):
    def get(self, request):
        character = request.character
        serializer = CharacterSerializer(character)
        response_data = serializer.data
        
        return Response(response_data, status=HTTP_200_OK)
    
    def put(self, request, character_id):
        try:
            character = Character.objects.get(id=character_id)
            
            data = request.data
            
            character.name = data.get('name', character.name)
            character.money = data.get('money', character.money)
            
            serializer = CharacterSerializer(character)
            
            return Response(serializer.data, status=HTTP_200_OK)
        except Exception as e:
            return Response({'error': e}, status=HTTP_400_BAD_REQUEST)