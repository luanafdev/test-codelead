from django.shortcuts import render
from rest_framework import generics
from .serializers import PostSerializer
from .serializers import SignUpFormSerializer
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from .models import Post
from .models import SignUpForm
from rest_framework.routers import DefaultRouter

# Create your views here.
class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

class CreateSignUpFormView(generics.CreateAPIView):
    queryset = SignUpForm.objects.all()
    serializer_class = SignUpFormSerializer
    permission_classes = [AllowAny]

