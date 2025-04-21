from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND, HTTP_503_SERVICE_UNAVAILABLE
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import requests
from .models import Character
from .serializers import CharacterSerializer
from user_app.models import User
from user_app.serializers import UserSerializer
from item_app.models import Item
from urllib.parse import quote
import json


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
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        
        if not user.APIKey:
            return Response({'error':'No API Key set.'}, status=HTTP_403_FORBIDDEN)
        
        try:
            headers = {
                'Authorization': f'Bearer {user.APIKey}'
            }
            response = requests.get('https://api.guildwars2.com/v2/characters?ids=all', headers=headers)
            
            if response.status_code != 200:
                
                return Response(
                    {
                        'error':'GW2 API Error',
                        'gw2_status_code': response.status_code,
                        'gw2_response':response.text[:200]
                    },
                    status=HTTP_400_BAD_REQUEST
                )
                # try:
                #     gw2_error = response.json()
                # except json.JSONDecodeError:
                #     gw2_error = response.text
                # return Response(
                #     {'error':'Failed to fetched characters.',
                #      'gw2_api_error': gw2_error,
                #      'status_code': response.status_code},
                #     status=HTTP_400_BAD_REQUEST
                # )
            
            characters = response.json()
            for character in characters:
                name = character['name']
                encoded_name = quote(name)
                character_response = requests.get(f'https://api.guildwars2.com/v2/characters/{encoded_name}', headers=headers)
                
                try:
                    character_data = character_response.json()
                except json.JSONDecodeError:
                    return Response(
                        {'error':'Invalid GW2 API reponse',
                         'character': name,
                         'gw2_status_code': character_response.status_code,
                         'gw2_response': character_response.text[:200]}
                    )
                
                if character_response.status_code != 200:
                
                    try:
                        gw2_error = response.json()
                    except json.JSONDecodeError:
                        gw2_error = response.text
                    return Response(
                        {'error':'Failed to fetched characters.',
                        'gw2_api_error': gw2_error,
                        'status_code': response.status_code},
                        status=HTTP_400_BAD_REQUEST
                    )
                
                
                
                character, _ =   Character.objects.update_or_create(
                    user=user,
                    name=name                    
                )
                
                character.items.clear()
                
                for bag in character_data.get("bags", []):
                    if bag and bag.get("inventory"):
                        for item_data in bag["inventory"]:
                            if item_data:
                                item,_ = Item.objects.get_or_create(
                                    game_id=item_data["id"],
                                    defaults={
                                        "name": item_data.get("name", "Unkownn"),
                                        "rarity":item_data.get("rarity", "Basic"),
                                        "vendor_value": item_data.get("vendor_value", 0),
                                        "icon": item_data.get("icon", "")
                                    })
                                character.items.add(item)
                                
            characters = Character.objects.filter(user=user)
            serializer = CharacterSerializer(characters, many=True)
            
            return Response(serializer.data, status=HTTP_200_OK)
        except Exception as e:
            print(f'Error fetching: {str(e)}')
            print(user.APIKey)
            print(name)
            return Response({'error': 'Failed to retrieve character from GW2 servers','detail': str(e)}, status=HTTP_503_SERVICE_UNAVAILABLE)
                
                