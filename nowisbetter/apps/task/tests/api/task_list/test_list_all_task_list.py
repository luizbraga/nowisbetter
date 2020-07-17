from rest_framework import status
from task.tests.mixins import LoginAPITestCaseMixin
from model_mommy import mommy


class TaskListCreateAPITest(LoginAPITestCaseMixin):

    LIST_ENDPOINT = '/api/tasks/lists/'

    def setUp(self):
        super(TaskListCreateAPITest, self).setUp()
        self.lista1 = mommy.make('task.TaskList')
        mommy.make('task.Task', list=self.lista1, users=[self.user])
        mommy.make('task.Task', list=self.lista1, users=[self.user])
        mommy.make('task.Task', list=self.lista1, users=[self.user])

        self.lista2 = mommy.make('task.TaskList')
        mommy.make('task.Task', list=self.lista2, users=[self.user])
        mommy.make('task.Task', list=self.lista2, users=[self.user])

    def test_listing_list_task(self):
        response = self.client.get(self.LIST_ENDPOINT)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_json = response.json()
        self.assertEqual(len(response_json), 2)
        self.assertEqual(len(response_json[0]['tasks']), 3)
        self.assertEqual(len(response_json[1]['tasks']), 2)

    def test_not_listing_unactive_task(self):
        task = self.lista1.tasks.all()[0]
        task.delete()

        response = self.client.get(self.LIST_ENDPOINT)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_json = response.json()
        self.assertEqual(len(response_json), 2)
        self.assertEqual(len(response_json[0]['tasks']), 2)
        self.assertEqual(len(response_json[1]['tasks']), 2)
