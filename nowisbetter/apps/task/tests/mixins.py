from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()


class LoginAPITestCaseMixin(APITestCase):

    def setUp(self):
        self.user = User.objects.get_or_create(username='testuser')[0]
        self.client.force_login(self.user)
