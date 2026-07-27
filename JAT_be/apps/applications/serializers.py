from rest_framework import serializers
from .models import Application
from apps.jobs.serializers import Jobserializer
from apps.accounts.serializer import UserSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    jobs = serializers.SerializerMethodField()
    appliers = serializers.SerializerMethodField()
    class Meta:
        model = Application
        fields = ['id' , 'application', 'applier','job', 'cv_resume' , 'cover_letter' , 'portfolio_link' , 'github_link','jobs','appliers']
        extra_kwargs = {'applier': {'read_only': True}, 'job':{'read_only':True} ,'jobs':{'read_only':True} ,'appliers':{'read_only':True}}

    def get_jobs(self, obj):
        job = obj.job
        return Jobserializer(job).data
    def get_appliers(self,obj):
        applier = obj.applier
        return UserSerializer(applier).data
    
    