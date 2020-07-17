from rest_framework import status
from model_mommy import mommy
from task.tests.mixins import LoginAPITestCaseMixin
from task.models import TaskList
from task.models import Task


class TaskListCreateAPITest(LoginAPITestCaseMixin):

    UPDATE_ENDPOINT = '/api/tasks/update/{}'.format

    def setUp(self):
        super(TaskListCreateAPITest, self).setUp()
        self.new_user = mommy.make('accounts.User', username='new_user')
        self.lista1 = mommy.make('task.TaskList')
        self.lista2 = mommy.make('task.TaskList')
        self.task = mommy.make('task.Task', list=self.lista1)

    def test_create_task(self):
        response = self.client.put(
            self.UPDATE_ENDPOINT(self.task.id),
            {'title': 'Task 1', 'list_id': self.lista2.id}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        new_task_list = TaskList.objects.get(id=self.lista2.id)
        self.assertEqual(new_task_list.tasks.all().count(), 1)

        old_task_list = TaskList.objects.get(id=self.lista1.id)
        self.assertEqual(old_task_list.tasks.all().count(), 0)

    def test_change_user(self):
        response = self.client.put(
            self.UPDATE_ENDPOINT(self.task.id),
            {'title': 'Task 1', 'list_id': self.lista2.id,
             'user_ids': [self.new_user.id, self.user.id]}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        updated_task = Task.objects.get(id=self.task.id)
        self.assertEqual(updated_task.users.all().count(), 2)

        response = self.client.put(
            self.UPDATE_ENDPOINT(self.task.id),
            {'title': 'Task 1', 'list_id': self.lista2.id,
             'user_ids': [self.new_user.id]}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        updated_task = Task.objects.get(id=self.task.id)
        self.assertEqual(updated_task.users.all().count(), 1)

        response = self.client.put(
            self.UPDATE_ENDPOINT(self.task.id),
            {'title': 'Task 1', 'list_id': self.lista2.id,
             'user_ids': [self.user.id]}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        updated_task = Task.objects.get(id=self.task.id)
        self.assertEqual(updated_task.users.all().count(), 1)
