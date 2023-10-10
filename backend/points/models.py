from django.db import models
from django.contrib.auth.models import User


class Marker(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()
    label = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
