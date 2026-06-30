from rest_framework import serializers
from .models import Job

class Jobserializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [ "poster", "is_approved" ,"title" , "description" , "requirement" , "responsibilty" , "salary" , "Employment" , "job_type" ]
        extra_kwargs = {'poster':{'read_only':True}}