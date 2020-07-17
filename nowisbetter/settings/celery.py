from decouple import config
from kombu import Exchange
from kombu import Queue


def celery_queue(key):
    return Queue(key, Exchange(key), routing_key=key)


# Celery configuration

CELERY_BROKER_URL = config('CELERY_BROKER_URL')

CELERY_RESULT_BACKEND = 'django-db'
CELERY_TASK_RESULT_EXPIRES = 18000

CELERY_CREATE_MISSING_QUEUES = True
CELERY_DEFAULT_QUEUE = 'default'
CELERY_QUEUES = (
    celery_queue('default')
)

QUEUE_ROUTES = {
    'default': {'queue': 'default', 'routing_key': 'default'}
}

CELERY_ROUTES = {
    'send-reports': QUEUE_ROUTES['default'],
    'send-email-to-user': QUEUE_ROUTES['default']
}

# CeleryBeat configuration

CELERYBEAT_SCHEDULER = 'djcelery.schedulers.DatabaseScheduler'

CELERY_TASK_SERIALIZER = 'json'

CELERY_ACCEPT_CONTENT = ['json']

CELERY_RESULT_SERIALIZER = 'json'

CELERY_DISABLE_RATE_LIMITS = True

CELERY_SEND_EVENTS = True

CELERY_SEND_TASK_SENT_EVENT = True
