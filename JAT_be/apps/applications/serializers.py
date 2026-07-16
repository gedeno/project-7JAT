from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'applier', 'job', 'cv_resume' , 'cover_letter' , 'portfolio_link' , 'github_link']
        extra_kwargs = {'applier': {'read_only': True}, 'job':{'read_only':True}}
        