from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import viewsets
from .views import CreatePostView
from .views import PostListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
# Create a router and register the viewset
router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    
    # Seu endpoint de registro de posts
    path('post/register/', CreatePostView.as_view(), name='create_post'),
    path('posts/', PostListView.as_view(), name='post-list'),
    
    # Autenticação DRF
    path('api-auth/', include('rest_framework.urls')),
]
