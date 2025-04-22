from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED , HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST
from .models import Watchlist, Watchlist_item
from .serializers import WatchlistSerializer, WatchlistItemSerializer
from item_app.models import Item
from character_app.models import Character

# Create your views here.
class Watchlist_manager(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        watchlist, created = Watchlist.objects.get_or_create(Character=request.character)
        serializer = WatchlistSerializer(watchlist)
        response_data  = serializer.data

        return Response(response_data, status=HTTP_200_OK)
    
    def post(self, request, item_id):
        try:
            character_id = request.data.get('character_id')
            print('recieved data: ',request.data)
            character = Character.objects.get(id=character_id)
            watchlist = character.watchlist
            item = Item.objects.get(id=item_id)
            watchlist_item,created = Watchlist_item.objects.get_or_create(watchlist=watchlist, item = item)
            
            data = request.data
            
            watchlist_item.sell_point = data.get('sell_point', watchlist_item.sell_point)
            watchlist_item.buy_point = data.get('buy_point', watchlist_item.buy_point)
            watchlist_item.save()
            
            serializer = WatchlistItemSerializer(watchlist_item)
            return Response(serializer.data, status=HTTP_200_OK)
        except Watchlist_item.DoesNotExist:
            return Response({'error': 'Watchlist item not found'}, status=HTTP_404_NOT_FOUND)
           
        
    def delete(self, request, watchlist_item_id):
        try:
            character_id = request.data.get('character_id')
            character = Character.objects.get(id=character_id)
            watchlist_item = Watchlist_item.objects.get(watchlist=character.watchlist, id=watchlist_item_id)
            watchlist_item.delete()
            
            
            return Response({'success': 'Item deleted'}, status=HTTP_200_OK)
        except Exception as e:
            return Response({'error': e }, status=HTTP_400_BAD_REQUEST)
        
        