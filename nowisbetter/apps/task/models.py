from django.db import models
from accounts.models import User
from datetime import datetime


class TaskList(models.Model):
    title = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Task(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    deadline = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    is_done = models.BooleanField(default=False)
    done_date = models.DateField(blank=True, null=True)

    list = models.ForeignKey(
        TaskList, related_name='tasks',
        on_delete=models.CASCADE)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super(Task, self).save(*args, **kwargs)
        if self.is_done and not self.done_date:
            self.done_date = datetime.now()
            self.save()
        elif not self.is_done and self.done_date:
            self.done_date = None
            self.save()
