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
        serializer.save(poster = self.request.user)

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        print(request.data)
    
        serializer = Jobserializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        serializer = Jobserializer(data=request.data)

        if not serializer.is_valid():
            print(serializer.errors)
        return Response({'work':'done'})
class JobDetail(RetrieveUpdateDestroyAPIView):
    queryset =Job.objects.all()
    serializer_class = Jobserializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        job = Job.objects.get(id = self.kwargs['pk'])
        return job
class Myjobs(ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = Jobserializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Job.objects.filter(poster = self.request.user)
class JobApprovalAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = Jobserializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        job = Job.objects.get(id = self.kwargs['pk'])
        return job

