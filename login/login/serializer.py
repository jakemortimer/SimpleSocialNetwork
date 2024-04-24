from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Post
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class UserSearchSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        users = User.objects.filter(username__contains=validated_data['username'])
        return users


    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    def create(self, validated_data):
        post = Post(
            user=validated_data['user'],
            text=validated_data['text']
        )
        post.save()
        return post

    class Meta:
        model = Post
        fields = ['id', 'user', 'username', 'text', 'created']

class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = ['key', 'user']