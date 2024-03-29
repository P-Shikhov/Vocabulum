from django.urls import path, include
from .views import TextViewSet

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'texts', TextViewSet, basename='texts')

app_name = 'texts'

urlpatterns = [
    path('', include(router.urls)),
]