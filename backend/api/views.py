from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import CodeLeapAPIService
from .serializers import PostSerializer

class PostListView(APIView):
    def get(self, request):
        posts = CodeLeapAPIService.get_posts()
        if posts is not None:
            return Response(posts['results'], status=status.HTTP_200_OK)
        return Response(
            {"error": "Failed to fetch posts from CodeLeap API"},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )

class PostCreateView(APIView):
    def post(self, request):
        data = {
            "username": request.data.get("username"),
            "title": request.data.get("title"),
            "content": request.data.get("content")
        }
        result = CodeLeapAPIService.create_post(data)
        if result:
            return Response(result, status=status.HTTP_201_CREATED)
        return Response(
            {"error": "Failed to create post"},
            status=status.HTTP_400_BAD_REQUEST
        )

class PostDeleteView(APIView):
    def delete(self, request, pk):
        success = CodeLeapAPIService.delete_post(pk)
        if success:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"error": "Failed to delete post"},
            status=status.HTTP_400_BAD_REQUEST
        )

class PostEditView(APIView):
    def patch(self, request, pk):
        data = {
            "title": request.data.get("title"),
            "content": request.data.get("content")
        }
        success = CodeLeapAPIService.edit_post(pk=pk, data=data)
        if success:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"error": "Failed to edit post"},
            status=status.HTTP_400_BAD_REQUEST
        )
