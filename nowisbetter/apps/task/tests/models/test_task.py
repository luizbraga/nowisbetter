from django.test import TestCase
from model_mommy import mommy


class TaskModelTest(TestCase):

    def setUp(self):
        self.list = mommy.make('task.TaskList')

    def test_representation(self):
        task = mommy.make('task.Task', title='Task1', list=self.list)
        self.assertEqual('Task1', str(task))
