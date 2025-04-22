from django.contrib.auth import authenticate
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .serializers import UserSerializer
from .models import User
import json

# Create your views here.
class Sign_up(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        
class Log_in(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "access":str(refresh.access_token),
                "refresh":str(refresh),
                "user":user.username
            })
        else:
            return Response("No user matching those credentials", status=HTTP_404_NOT_FOUND)
 
       
class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT) 
    
    # def post(self,request):
    #     request.user.auth_token.delete()
    #     return Response(status=HTTP_204_NO_CONTENT)
    
class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({"username": request.user.username})
    

class Set_API_Key(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({
                'error': 'Authentication required',
                status: 400
            })
        
        try:
            user = request.user
            data = json.loads(request.body)
            user.APIKey = data.get('api_key')
            user.save()
            
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status = HTTP_400_BAD_REQUEST)