from django.db import models

from apps.accounts.models import User
from apps.jobs.models import Job

class Application(models.Model):
    applier = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.OneToOneField(Job, on_delete=models.CASCADE)
    cv_resume = models.FileField(upload_to='resumes/', blank=False, null=False)
