from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Friend

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ['id', 'friend']

class UserSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'friends']

    def get_friends(self, obj):
        friends = Friend.objects.filter(user=obj)
        return [{'id': friend.friend.id, 'username': friend.friend.username} for friend in friends]
