from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView , ListCreateAPIView , RetrieveUpdateDestroyAPIView 
from .models import CustomUserManager , User
from .serializer import UserSerializer 
from rest_framework.permissions import IsAuthenticated ,AllowAny
from rest_framework.viewsets import ModelViewSet
# Create your views here.

class CreateUserApiView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        return super().post(request, *args, **kwargs)
    def get(self, request):
        return Response({
            "username": request.user.username,
        })