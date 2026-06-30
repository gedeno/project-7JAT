from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView ,RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated , AllowAny
from .serializers import Jobserializer
from .models import Job

# Create your views here.
class CreateJobApiView(ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = Jobserializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(poster = self.request.user)


