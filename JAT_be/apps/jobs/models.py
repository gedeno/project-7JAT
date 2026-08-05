from mimetypes import common_types
from urllib import response

from django.db import models
from apps.accounts.models import User
JOB_CHOOSE  = (
    ("Remote","Remote"),
    ("Onsite","Onsite"),
    ("Hybrid","Hybrid")

)

class Job(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    is_approved = models.CharField(max_length=200 , null=True , default= None)
    title = models.CharField(max_length=40)
    description = models.TextField()
    company = models.CharField(max_length=300)
    salary = models.CharField(max_length=300)
    job_type = models.CharField(max_length=200)
    Employment_type = models.CharField(max_length=200  )
    location = models.CharField(max_length=300)
    deadline = models.CharField(max_length=500)

