from django.db.models.signals import post_delete
from django.dispatch import receiver
from task.models import Task
from task.models import TaskList


@receiver(post_delete, sender=Task)
def post_delete_task(sender, instance, **kwargs):
    instance.is_active = False
    instance.save()


@receiver(post_delete, sender=TaskList)
def post_delete_tasklist(sender, instance, **kwargs):
    instance.is_active = False
    instance.save()
