from rest_framework import serializers
from .models import Job

class Jobserializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [ "poster","title" , "description" , "company" , "salary" , "Employment_type" , "job_type" , "location" , "deadline" ]
        extra_kwargs = {'poster':{'read_only':True}}