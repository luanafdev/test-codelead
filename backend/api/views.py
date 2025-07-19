from django.shortcuts import render
from rest_framework import generics
from .serializers import PostSerializer
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from .models import Post
from rest_framework.routers import DefaultRouter
import requests
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


class PostListView(APIView):
    def get(self, request):
        posts = Post.objects.all().order_by('-created_datetime')  # Mais recentes primeiro
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    permission_classes = [AllowAny]

# Create your views here.
class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
