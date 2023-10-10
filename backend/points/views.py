from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Marker
from .serializers import MarkerSerializer
from .permissions import IsOwnerOrAdmin


class MarkerViewSet(viewsets.ModelViewSet):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        return super().update(request, *args, **kwargs)

    def get_permissions(self):
        # Apply IsOwnerOrAdmin permission for update, partial_update, and destroy actions
        if self.action in ['update', 'partial_update', 'destroy']:
            return [IsOwnerOrAdmin()]
        return [IsAuthenticated()]
