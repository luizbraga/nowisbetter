from rest_framework import status
from model_mommy import mommy
from task.tests.mixins import LoginAPITestCaseMixin
from task.models import TaskList
from django.contrib.auth import get_user_model

User = get_user_model()


class TaskListCreateAPITest(LoginAPITestCaseMixin):

    CREATE_ENDPOINT = '/api/tasks/create/'

    def setUp(self):
        super(TaskListCreateAPITest, self).setUp()
        self.lista = mommy.make('task.TaskList')

    def test_create_task(self):
        response = self.client.post(
            self.CREATE_ENDPOINT,
            {'title': 'Task 1',
             'list_id': self.lista.id,
             'user_ids': [self.user.id]}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        task_list_updated = TaskList.objects.get(id=self.lista.id)
        self.assertEqual(task_list_updated.tasks.all().count(), 1)

        task = task_list_updated.tasks.all()[0]
        self.assertEqual(task.users.all()[0].id, self.user.id)

    def test_create_task_to_another_user(self):
        dummy_user = User.objects.get_or_create(
            username='dummyuser', email='another@example.com')[0]
        response = self.client.post(
            self.CREATE_ENDPOINT,
            {'title': 'Task 1',
             'list_id': self.lista.id,
             'user_ids': [dummy_user.id]}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        task_list_updated = TaskList.objects.get(id=self.lista.id)
        self.assertEqual(task_list_updated.tasks.all().count(), 1)

        task = task_list_updated.tasks.all()[0]
        self.assertEqual(task.users.all().count(), 1)
        self.assertNotEqual(task.users.all()[0].id, self.user.id)
        self.assertEqual(task.users.all()[0].id, dummy_user.id)
