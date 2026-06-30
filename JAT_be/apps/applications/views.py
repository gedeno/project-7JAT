from django.shortcuts import render
from rest_framework import generics
from . serializers import ApplicationSerializer
from . models import Application
from rest_framework.permissions import AllowAny , IsAuthenticated


class GetMyApplicationsAPIView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(user=self.request.user)
