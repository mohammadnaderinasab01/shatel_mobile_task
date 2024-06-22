from typing import Any
from django.contrib.auth.models import AbstractUser, UserManager as AbstractUserManager
from django.utils.translation import gettext_lazy as _
from django.db import models
from utils.validators import only_int
import uuid


class UserManager(AbstractUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)
    
    # def create_superuser(self, email, password=None):
    #     """
    #     Creates and saves a superuser with the given email and password.
    #     """
    #     user = self.create_user(
    #         email,
    #         password=password,
    #     )
    #     user.email = email
    #     user.is_superuser = True
    #     user.is_staff = True
    #     user.save(using=self._db)
    #     return user
    

class User(AbstractUser):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    name = models.CharField(max_length=255)
    national_ID = models.CharField(max_length=10, validators=[only_int])
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()
