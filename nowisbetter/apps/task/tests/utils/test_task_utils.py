from django.test import TestCase
from model_mommy import mommy
from datetime import datetime
from datetime import timedelta

from task.utils import report_tasks


class TaskReportTest(TestCase):

    def setUp(self):
        self.list = mommy.make('task.TaskList')
        today = datetime.now()
        self.task1 = mommy.make(
            'task.Task', title='Task1',
            list=self.list, deadline=today)
        self.task2 = mommy.make(
            'task.Task', title='Task2',
            list=self.list, deadline=today + timedelta(days=1), is_done=False)
        self.task3 = mommy.make(
            'task.Task', title='Task3',
            list=self.list, deadline=today + timedelta(days=2), is_done=False)

    def test_next_tasks(self):
        self.task1.is_done = True
        self.task1.save()

        now = datetime.now()
        report = report_tasks(now)

        self.assertEqual(report['done'][0].id, self.task1.id)
        self.assertEqual(len(report['next_tasks']), 2)

        report = report_tasks(now + timedelta(days=1))

        self.assertEqual(len(report['done']), 0)
        self.assertEqual(len(report['next_tasks']), 2)
        self.assertEqual(report['next_tasks'][0].id, self.task2.id)
