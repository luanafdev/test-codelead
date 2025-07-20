import requests
from django.conf import settings
from requests.exceptions import RequestException

class CodeLeapAPIService:
    BASE_URL = "https://dev.codeleap.co.uk/careers/"

    @classmethod
    def get_posts(cls):
        try:
            response = requests.get(f"{cls.BASE_URL}")
            response.raise_for_status()
            return response.json()
        except RequestException as e:
            print(f"Error fetching posts: {e}")
            return None

    @classmethod
    def create_post(cls, data):
        try:
            response = requests.post(f"{cls.BASE_URL}", json=data)
            response.raise_for_status()
            return response.json()
        except RequestException as e:
            print(f"Error creating post: {e}")
            return None

    @classmethod
    def delete_post(cls, post_id):
        try:
            response = requests.delete(f"{cls.BASE_URL}{post_id}/")
            return response.status_code == 204
        except RequestException as e:
            print(f"Error deleting post: {e}")
            return False

    @classmethod
    def edit_post(cls, post_id):
        try:
            response = requests.edit(f"{cls.BASE_URL}{post_id}/")
            return response.status_code == 204
        except RequestException as e:
            print(f"Error editing post: {e}")
            return False