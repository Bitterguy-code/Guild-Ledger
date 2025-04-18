from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED , HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST
from .models import Watchlist, Watchlist_item
from .serializers import WatchlistSerializer, WatchlistItemSerializer
from item_app.models import Item

# Create your views here.
class Watchlist_manager(APIView):
    def get(self, request):
        watchlist = request.character.watchlist
        serializer = WatchlistSerializer(watchlist)
        response_data  = serializer.data

        return Response(response_data, status=HTTP_200_OK)
    
    def post(self, request):
        watchlist = request.character.watchlist
        item_id = request.data.get('item_id')
        
        try:
            item = Item.objects.get(id=item_id)
        except:
            return Response({'error': "item not found"}, status=HTTP_404_NOT_FOUND)
        
        if Watchlist_item.objects.filter(watchlist=watchlist, item=item).exists():
            return Response({'error': "Item already in watchlist"}, status=HTTP_404_NOT_FOUND)
        
        Watchlist_item.objects.create(watchlist=watchlist, item=item)
        
        serializer = WatchlistSerializer(watchlist)
        
        return Response(serializer.data, status=HTTP_201_CREATED)
    
    def put(self, request, watchlist_item_id):
        try:
            watchlist = request.character.watchlist
            watchlist_item = Watchlist_item.objects.get(watchlist=watchlist, id=watchlist_item_id)
            
            data = request.data
            
            watchlist_item.sell_point = data.get('sell_point', watchlist_item.sell_point)
            watchlist_item.buy_point = data.get('buy_point', watchlist_item.buy_point)
            
            serializer = WatchlistItemSerializer(watchlist_item)
            return Response(serializer.data, status=HTTP_200_OK)
        except Watchlist_item.DoesNotExist:
            return Response({'error': 'Watchlist item not found'}, status=HTTP_404_NOT_FOUND)
        
    def delete(self, request, watchlist_item_id):
        try:
            watchlist = request.character.watchlist
            watchlist_item = Watchlist_item.objects.get(watchlist=watchlist, id=watchlist_item_id)
            watchlist_item_id.delete()
            serializer = WatchlistItemSerializer(watchlist_item)
            
            return Response(serializer.data, status=HTTP_200_OK)
        except Exception as e:
            return Response({'error': e }, status=HTTP_400_BAD_REQUEST)
        
        