import celery
from celery import group
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings

from datetime import datetime
from .utils import report_tasks
from .utils import default_report_message


User = get_user_model()


@celery.task(bind=True, name='send-reports', queue='default')
def send_reports(self):
    today = datetime.now()
    raw_report = report_tasks(today)
    report = {
        'subject': 'Daily task report',
        'message': default_report_message(raw_report),
        'from_email': settings.DEFAULT_FROM_EMAIL
    }
    users = User.objects.filter(is_active=True)
    g = group(
        send_email_to_user.s(user_id=user.id, user_report=report)
        for user in users)
    g.apply_async()


@celery.task(bind=True, name='send-email-to-user', queue='default')
def send_email_to_user(self, user_id, user_report):
    user = User.objects.get(id=user_id)
    send_mail(recipient_list=[user.email], **user_report)
