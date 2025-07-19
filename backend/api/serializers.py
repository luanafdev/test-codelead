from rest_framework import serializers
from .models import Post
from .models import SignUpForm

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'username', 'created_datetime', 'title', 'content']
        read_only_fields = ['created_datetime']  # created_datetime should not be writable
        extra_kwargs = {
            'id': {'read_only': True},
            'created_datetime': {'read_only': True},
            'username': {'required': True},
        }

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