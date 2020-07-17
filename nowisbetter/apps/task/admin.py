from django.contrib.admin import register
from django.contrib.admin import ModelAdmin
from task.models import TaskList
from task.models import Task


@register(TaskList)
class TaskListAdmin(ModelAdmin):
    list_display = ('title', 'is_active', 'count_tasks')
    search_fields = ('title', 'is_active')

    def count_tasks(self, obj):
        return obj.tasks.all().count()


@register(Task)
class TaskAdmin(ModelAdmin):
    list_display = ('title', 'is_done', 'is_active', 'list')
    list_filter = ('is_active', 'is_done')
    search_fields = ('title', 'user__username')
    autocomplete_fields = ['list']
