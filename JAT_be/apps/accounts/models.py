from ast import Tuple
from re import U

from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, UserManager, AbstractUser

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("Username is required")

        if not email:
            raise ValueError("Email field is required")

        user = self.model(username=username,email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        return self.create_user(username,email, password, **extra_fields)
    
class User(AbstractBaseUser):
    first_name = models.CharField(max_length=150 , unique=True)
    last_name = models.CharField(max_length=200 , unique=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(blank=False, null=False, unique=True)

    is_varified = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username
