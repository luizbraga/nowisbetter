from django.core import mail
from django.test import TestCase
from task.tasks import send_email_to_user
from django.contrib.auth import get_user_model

User = get_user_model()


class SendEmailTest(TestCase):

    def test_send_email(self):
        user = User.objects.get_or_create(
            username='testuser', email='to@example.com')[0]
        report = {
            'subject': 'Daily task report',
            'message': 'There is 2 tasks pending and 0 were done today.',
            'from_email': 'from@example.com'
        }
        send_email_to_user(user.id, report)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, report['subject'])
