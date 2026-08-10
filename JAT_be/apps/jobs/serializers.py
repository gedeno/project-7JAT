from rest_framework import serializers
from .models import Job

class Jobserializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [ "id", "poster","title" , "description" , "company" , "salary" , "Employment_type" , "job_type" , "location" , "deadline","is_approved" ]
        extra_kwargs = {'poster':{'read_only':True} , 'poster':{'is_approved':True}}