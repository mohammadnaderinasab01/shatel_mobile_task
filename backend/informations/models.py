from django.db import models
from users.models import User
from utils.validators import only_int
from django.core.exceptions import ValidationError


class Information(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    national_ID = models.CharField(max_length=10, validators=[only_int])
    email = models.EmailField(max_length=255)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name
    

class EmailTemplate(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(max_length=2500)
    
    def save(self, *args, **kwargs):
        if not self.pk and EmailTemplate.objects.exists():
            raise ValidationError('There is can be only one EmailTemplate instance')
        return super(EmailTemplate, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.title
    