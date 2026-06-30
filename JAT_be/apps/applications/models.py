from asyncio.windows_events import NULL

from django.db import models

from apps.accounts.models import User
from apps.jobs.models import Job

class Application(models.Model):
    applier = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.OneToOneField(Job, on_delete=models.CASCADE)
    cv_resume = models.FileField(upload_to='resumes/', blank=False, null=False)
    cover_letter = models.TextField()
    portfolio_link = models.URLField(blank=True , null= True , default=NULL)
    github_link = models.URLField(blank=True , null=True , default=NULL)
    