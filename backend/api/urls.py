from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import viewsets
from .views import PostListView, PostCreateView, PostDeleteView, PostEditView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
# Create a router and register the viewset
router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    
    # Seu endpoint de registro de posts
    path('posts/', PostListView.as_view(), name='list'),
    path('posts/create/', PostCreateView.as_view(), name='create'),
    path('posts/<int:pk>/delete/', PostDeleteView.as_view(), name='delete'),
    path('posts/<int:pk>/edit/', PostEditView.as_view(), name='edit'),
    
    # Autenticação DRF
    path('api-auth/', include('rest_framework.urls')),
]
