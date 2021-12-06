from django.db import models
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Text, CustomUser
from .serializers import TextSerializer

class TextViewSet(viewsets.ModelViewSet):
    model = Text
    serializer_class = TextSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        current_user = CustomUser.objects.get(id=self.request.user.id)
        return current_user.text_set.all()

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid() and request.user.id == request.data['author']:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response("Unauthorized", status=status.HTTP_401_UNAUTHORIZED)
