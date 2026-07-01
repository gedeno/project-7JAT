from email.mime import application
from django.shortcuts import render
from rest_framework import generics
from . serializers import ApplicationSerializer
from . models import Application
from apps.jobs.models import Job
from rest_framework.permissions import AllowAny , IsAuthenticated


class GetMyApplicationsAPIView(generics.ListAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        print(Application.objects.filter(applier=self.request.user.id))
        return Application.objects.filter(applier=self.request.user.id)

class CreateApplictaionApiView(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    def get_job(self):
        return Job.objects.get(id = self.kwargs['pk'])
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(applier = self.request.user ,job =self.get_job())
            