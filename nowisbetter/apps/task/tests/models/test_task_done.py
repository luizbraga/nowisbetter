from django.test import TestCase
from model_mommy import mommy
from datetime import datetime


class TaskDoneTest(TestCase):

    def setUp(self):
        self.list = mommy.make('task.TaskList')
        self.task = mommy.make('task.Task', title='Task1', list=self.list)

    def test_done(self):
        self.task.is_done = True
        self.task.save()

        self.assertEqual(self.task.done_date.day, datetime.now().day)
        self.assertEqual(self.task.done_date.month, datetime.now().month)
        self.assertEqual(self.task.done_date.year, datetime.now().year)

    def test_reset_done_date(self):
        self.task.is_done = True
        self.task.save()

        self.task.is_done = False
        self.task.save()

        self.assertEqual(self.task.done_date, None)
