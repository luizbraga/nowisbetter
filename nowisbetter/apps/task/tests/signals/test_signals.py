from django.test import TestCase
from model_mommy import mommy


class SignalTaskTest(TestCase):

    def setUp(self):
        self.list = mommy.make('task.TaskList')
        self.task = mommy.make('task.Task', list=self.list)

    def test_on_delete(self):
        self.task.delete()
        self.assertEqual(self.task.is_active, False)
        self.assertEqual(self.task.list.id, self.list.id)
