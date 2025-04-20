from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND
from rest_framework.response import Response
import requests
from .models import Character
from .serializers import CharacterSerializer

# Create your views here.
class CharacterView(APIView):
    def get(self, request, character_id):
        character = Character.objects.get(id=character_id)
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
        
class CharacterListView(APIView):
    def get(self, request):
        user = request.user
        
        if not user.APIkey:
            return Response({'error':'No API Key set.'}, status=HTTP_403_FORBIDDEN)
        
        try:
            headers = {
                'Authorization': f'Bearer {user.APIKey}'
            }
            response = requests.get('https://api.guildwars2.com/v2/characters?ids=all', headers=headers)
            
            if response.status_code != 200:
                return Response(
                    {'error':'Failed to fetched characters.'},
                    status=HTTP_400_BAD_REQUEST
                )
            
            characters = response.json()
            ledger_characters = []
            for data in characters:
                character_response = requests.get(f'https://api.guildwars2.com/v2/characters/{data.name}', headers=headers)
                character_data = character_response.data
                inventory = []
                
                if character_response.status_code != 200:
                    return Response({'error':f'Could not retrieve character'}, status=HTTP_404_NOT_FOUND)
                
                character, _ =   Character.objects.update_or_create(
                    user=user,
                    
                )
                
                #Implement putting items into inventory
                
                