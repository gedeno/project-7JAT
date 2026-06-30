from django.db import models
from apps.accounts.models import User

class Job(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=40)
    is_approved = models.BooleanField(default=False)
    description = models.TextField()