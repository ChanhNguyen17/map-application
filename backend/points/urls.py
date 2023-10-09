from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import MarkerViewSet

router = DefaultRouter()
router.register(r'markers', MarkerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
