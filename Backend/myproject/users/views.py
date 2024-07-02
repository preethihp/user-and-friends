from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Friend
from .serializers import UserSerializer, FriendSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer

    @action(detail=False, methods=['post'])
    def add_friend(self, request):
        user_id = request.data.get('user_id')
        friend_username = request.data.get('friend_username')
        
        if user_id and friend_username:
            user = User.objects.get(id=user_id)
            friend = User.objects.get(username=friend_username)
            Friend.objects.create(user=user, friend=friend)
            return Response({'status': 'friend added'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
