from rest_framework import serializers
from .models import Post
from .models import SignUpForm
from django.contrib.humanize.templatetags.humanize import naturaltime

class PostSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField(read_only=True)  # Campo calculado
    
    class Meta:
        model = Post
        fields = ['id', 'username', 'created_datetime', 'title', 'content', 'time_ago']
        extra_kwargs = {
            'username': {'required': True},
            'title': {'required': True},
            'content': {'required': True},
        }

    def get_time_ago(self, obj):
        """Calcula 'X tempo atrás'"""
        return naturaltime(obj.created_datetime)

    def create(self, validated_data):        
        return Post.objects.create(**validated_data)

class SignUpFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignUpForm
        fields = ['username']
        extra_kwargs = {
            'username': {'required': True, 'max_length': 150, 'validators': []},
        }

    def create(self, validated_data):
        return SignUpForm.objects.create(**validated_data)