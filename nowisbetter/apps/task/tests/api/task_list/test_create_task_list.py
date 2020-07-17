from rest_framework import status
from task.tests.mixins import LoginAPITestCaseMixin

from task.models import TaskList


class TaskListCreateAPITest(LoginAPITestCaseMixin):

    CREATE_ENDPOINT = '/api/tasks/list/create/'

    def test_create(self):
        response = self.client.post(
            self.CREATE_ENDPOINT,
            {'title': 'Lista 1'}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsNotNone(response.json()['id'])
        self.assertIsNotNone(response.json()['title'])

        task_list = TaskList.objects.all()
        self.assertEqual(task_list.count(), 1)
        self.assertEqual(task_list[0].title, 'Lista 1')
