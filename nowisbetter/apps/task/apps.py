from django.apps import AppConfig


class TaskConfig(AppConfig):
    name = 'task'
    verbose_name = 'Task'

    def ready(self):
        import task.signals  # noqa
