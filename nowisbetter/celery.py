from celery import Celery
from django.conf import settings
from datetime import timedelta
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nowisbetter.settings')

app = Celery('nowisbetter')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    'send-report-daily': {
        'task': 'send-reports',
        'schedule': timedelta(days=1),
        'options': {'queue': 'default'}
    }
}
