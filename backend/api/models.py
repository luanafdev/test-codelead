from django.db import models

class Post(models.Model):

    username = models.CharField(max_length=150)
    created_datetime = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title


class SignUpForm(models.Model):
    username = models.CharField(max_length=150, unique=True)
    
    def __str__(self):
        return self.username