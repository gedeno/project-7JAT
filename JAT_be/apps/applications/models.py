from asyncio.windows_events import NULL

from django.db import models

from apps.accounts.models import User
from apps.jobs.models import Job

class Application(models.Model):
    applier = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.OneToOneField(Job, on_delete=models.CASCADE)
    application = models.CharField(max_length=200 , null=True , default= "pending")
    cv_resume = models.FileField(upload_to='resumes/', blank=False, null=False)
    cover_letter = models.TextField()
    portfolio_link = models.CharField(blank=True, null=True, default=None)
    github_link = models.CharField(blank=True, null=True, default=None)  