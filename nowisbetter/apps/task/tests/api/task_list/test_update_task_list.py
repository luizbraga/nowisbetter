from rest_framework import status
from model_mommy import mommy

from task.tests.mixins import LoginAPITestCaseMixin
from task.models import TaskList


class TaskListUpdateAPITest(LoginAPITestCaseMixin):
    UPDATE_ENDPOINT = '/api/tasks/list/update/{}'.format

    def test_update_task_list(self):
        NOVO_TITULO = 'Lista 1'
        lista = mommy.make('task.TaskList')
        self.assertNotEqual(lista.title, NOVO_TITULO)

        response = self.client.put(
            self.UPDATE_ENDPOINT(lista.id),
            {'title': NOVO_TITULO}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_lista = TaskList.objects.get(id=lista.id)
        self.assertEqual(updated_lista.title, NOVO_TITULO)

    def test_update_error_task_list(self):
        NOVO_TITULO = 'Lista 1'
        lista = mommy.make('task.TaskList')

        response = self.client.put(
            self.UPDATE_ENDPOINT(lista.id),
            {'titulo': NOVO_TITULO}
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
