from rest_framework import generics
from todos.models import Todo
from todos.serializers import TodoSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework import permissions
from todos.permissions import IsOwnerOrReadOnly
from rest_framework import viewsets


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
