from rest_framework import viewsets
from .models import Marker
from .serializers import MarkerSerializer


class MarkerViewSet(viewsets.ModelViewSet):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer
