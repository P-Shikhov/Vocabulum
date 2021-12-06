from django.db import models

from email_and_username_auth.models import CustomUser

class Text(models.Model):
    title = models.CharField(max_length=150)
    text = models.TextField()
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
