from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView ,RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated , AllowAny

from JAT_be.apps.accounts import serializer
from .serializers import Jobserializer
from .models import Job

# Create your views here.
class CreateJobApiView(ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = Jobserializer
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = Jobserializer(data = self.request.user)
        serializer.is_valid(raise_exception=True)
        serializer.save(poster = self.request.user)
        return Response(serializer.data)
