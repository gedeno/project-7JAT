from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView , ListCreateAPIView , RetrieveUpdateDestroyAPIView 
from .models import CustomUserManager , User
from .serializer import UserSerializer 
from rest_framework.permissions import IsAuthenticated ,AllowAny
# Create your views here.

class CreateUserApiView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        return super().post(request, *args, **kwargs)