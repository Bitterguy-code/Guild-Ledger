from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .models import Item
from .serializers import ItemSerializer

# Create your views here.
class An_Item(APIView):
    def get(self, request):
        item = request.item
        serializer = ItemSerializer(item)
        
        return Response(serializer.data, status=HTTP_200_OK )
    