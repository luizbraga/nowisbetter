from django.test import TestCase
from model_mommy import mommy


class TaskListModelTest(TestCase):

    def setUp(self):
        self.list = mommy.make('task.TaskList')

    def test_count(self):
        mommy.make('task.Task', list=self.list)
        mommy.make('task.Task', list=self.list)
        mommy.make('task.Task', list=self.list)

        self.assertEqual(self.list.tasks.all().count(), 3)
