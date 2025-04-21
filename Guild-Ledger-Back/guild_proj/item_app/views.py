from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from urllib.parse import unquote
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND
from django.http import JsonResponse
from .models import Item
from .serializers import ItemSerializer
from datetime import date, timedelta
from urllib.parse import unquote
import requests
import json

# Create your views here.
class An_Item(APIView):
    def get(self, request, item_name):
        decoded_name = unquote(item_name)
        item = Item.objects.get(name=decoded_name)
        serializer = ItemSerializer(item)
        
        return Response(serializer.data, status=HTTP_200_OK )
    
class ItemHistoricView(APIView):
    def get(self,request, item_name):
        try:
            decode_name = unquote(item_name)
            active_item = Item.objects.get(name=decode_name)
        except Item.DoesNotExist:
            return Response({'error': f'Could not find {item_name}'},
                            status=HTTP_404_NOT_FOUND)
        today = date.today()
        three_days_ago = today - timedelta(days=4)
        today = today.strftime("%Y-%m-%d")
        
        try:
            response = requests.get(f'https://api.datawars2.ie/gw2/v2/history/json?itemID={active_item.game_id}&start={three_days_ago}&end={today}&fields=date,buy_price_avg,sell_price_avg')
            
            if response.status_code != 200:
                
                try:
                    dataWar_error = response.json()
                except json.JSONDecodeError:
                    dataWar_error = response.text
                return Response(
                    {'error': 'Failed to get item info',
                    'data_wars_error': dataWar_error,
                    'status_code': response.status_code},
                    status=HTTP_400_BAD_REQUEST
                )
            
            history_data = response.json()
            if not isinstance(history_data, list) or len(history_data) <3:
                return Response(
                    {'error':'Inssuficient historical data'},
                    status=HTTP_400_BAD_REQUEST
                )
            
            
            active_item.yesterday_buy = history_data[2].get('buy_price_avg')
            active_item.yesterday_sell = history_data[2].get('sell_price_avg')
            active_item.yesteryesterday_buy = history_data[1].get('buy_price_avg')
            active_item.yesteryesterday_sell = history_data[1].get('sell_price_avg')
            active_item.yesteryesteryesterday_buy = history_data[0].get('buy_price_avg')
            active_item.yesteryesteryesterday_sell = history_data[0].get('sell_price_avg')
            active_item.save()
            
            serializer = ItemSerializer(active_item)
            return Response({
                'item':serializer.data,
                'history': history_data}, HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Failed to get item history data',
                             'detail': str(e)},
                            status=HTTP_500_INTERNAL_SERVER_ERROR)
            
def item_search(request):
    query=request.GET.get('q','')
    if query:
        results = Item.objects.filter(name__icontains=query)[:10]
        data = [{'id': item.id, 'name': item.name} for item in results]
        return JsonResponse(data, safe=False)
    return JsonResponse([], safe=False)
