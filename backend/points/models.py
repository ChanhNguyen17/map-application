from django.db import models


class Marker(models.Model):
    lat = models.FloatField()
    lng = models.FloatField()
    label = models.CharField(max_length=255)
