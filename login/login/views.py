from django.utils import timezone
from django.shortcuts import redirect
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from .models import Post

from .serializer import PostSerializer, TokenSerializer, UserSerializer, UserSearchSerializer
from rest_framework.authtoken.models import Token

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class UserLoginView(APIView):
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            login(request, user)
            # set user-specific data in the session
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, "id": user.id})
        else:
            return Response({'error': 'Invalid credentials'}, status=401)
        
class UserListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserSerializer(User.objects.all(), many=True)
        return Response(serializer.data)
    
class UserListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, pk=None, format=None):
        serializer = UserSerializer(User.objects.all() if not pk else User.objects.filter(id=pk), many=True)
        return Response(serializer.data)
    
class PostCreationView(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

class PostView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        serializer = PostSerializer(Post.objects.filter(created__gte=timezone.now().replace(hour=0, minute=0, second=0)), many=True)
        return Response(serializer.data)

class UserPostView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, pk=None, format=None):
        if not pk:
            return Response(status=500)
        serializer = PostSerializer(Post.objects.filter(user_id=pk), many=True)
        return Response(serializer.data)
    
class TokenCheckView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        serializer = TokenSerializer(Token.objects.filter(key=request.data["token"]), many=True)
        return Response(serializer.data)
    
class SearchView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        print(request.data)
        serializer = UserSearchSerializer(User.objects.filter(username__contains=request.data["username"]), many=True)
        return Response(serializer.data)
    