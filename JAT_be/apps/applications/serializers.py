from rest_framework import serializers
from .models import Application
from apps.jobs.serializers import Jobserializer


class ApplicationSerializer(serializers.ModelSerializer):
    jobs = serializers.SerializerMethodField()
    class Meta:
        model = Application
        fields = ['id', 'applier','job', 'cv_resume' , 'cover_letter' , 'portfolio_link' , 'github_link','jobs']
        extra_kwargs = {'applier': {'read_only': True}, 'job':{'read_only':True} ,'jobs':{'read_only':True}}

    def get_jobs(self, obj):
        job = obj.job
        return Jobserializer(job).data