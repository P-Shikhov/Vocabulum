from django.urls import path, include
from .views import UserCreate, UserViewSet, MyTokenObtainPairView

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

app_name = 'users'

urlpatterns = [
    path('users/create/', UserCreate.as_view(), name="create_user"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]