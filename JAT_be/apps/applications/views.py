from email.mime import application
from django.shortcuts import render
from rest_framework import generics
from . serializers import ApplicationSerializer
from . models import Application
from apps.jobs.models import Job
from rest_framework.permissions import AllowAny , IsAuthenticated
from rest_framework.parsers import MultiPartParser , FormParser


class GetMyApplicationsAPIView(generics.ListAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        print(Application.objects.filter(applier=self.request.user.id))
        return Application.objects.filter(applier=self.request.user.id)

class CreateApplictaionApiView(generics.ListCreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    def get_job(self):
        return Job.objects.get(id = self.kwargs['pk'])
        
    def perform_create(self, serializer):
        serializer.save(applier = self.request.user ,job =self.get_job())
class Myjobapps(generics.ListCreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    def get_job(self):
        myjob = Job.objects.filter(id = self.kwargs['pk'])
        return myjob
    def get_object(self):
        applicant = Application.objects.filter(job=self.get_job)
        return applicant