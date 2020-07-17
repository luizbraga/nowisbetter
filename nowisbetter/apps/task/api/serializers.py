from rest_framework import serializers
from django.contrib.auth import get_user_model

from task.models import TaskList
from task.models import Task

User = get_user_model()


class TaskSerializer(serializers.ModelSerializer):
    user_ids = serializers.SerializerMethodField('get_active_users')

    def get_active_users(self, task):
        queryset = task.users.filter(is_active=True)
        return queryset.values_list('id', flat=True)

    class Meta:
        model = Task
        fields = (
            'id', 'title', 'description', 'deadline',
            'is_done', 'user_ids', 'is_active'
        )


class TaskFormSerializer(serializers.ModelSerializer):
    description = serializers.CharField(required=False, allow_blank=True)
    deadline = serializers.DateTimeField(
        allow_null=True, required=False, format='%d-%m-%Y')

    list_id = serializers.PrimaryKeyRelatedField(
        many=False, read_only=False,
        queryset=TaskList.objects.all(), source='list')

    user_ids = serializers.PrimaryKeyRelatedField(
        many=True, read_only=False,
        queryset=User.objects.all(), source='users')

    def get_difference_between(self, list_1, list_2):
        return [elem for elem in list_1 if elem not in list_2]

    def create(self, validated_data):
        users = validated_data.pop('users', [])
        task = Task.objects.create(**validated_data)

        for user in users:
            task.users.add(user)

        task.save()
        return task

    def update(self, instance, validated_data):
        users = validated_data.pop('users', instance.users.all())

        instance.title = validated_data.get('title', instance.title)
        instance.deadline = validated_data.get('deadline', instance.deadline)
        instance.list = validated_data.get('list', instance.list)
        instance.description = validated_data.get('description',
                                                  instance.description)
        instance.is_active = validated_data.get('is_active',
                                                instance.is_active)
        instance.is_done = validated_data.get('is_done',
                                              instance.is_done)

        current_users = instance.users.all()
        add_users = self.get_difference_between(users, current_users)
        remove_users = self.get_difference_between(current_users, users)

        for user in remove_users:
            instance.users.remove(user)
        for user in add_users:
            instance.users.add(user)

        instance.save()
        return instance

    class Meta:
        model = Task
        fields = (
            'id', 'title', 'description', 'deadline', 'is_active',
            'is_done', 'list_id', 'user_ids'
        )


class TaskListSerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField('get_active_tasks')

    def get_active_tasks(self, task_list):
        queryset = Task.objects.filter(is_active=True, list=task_list)
        serializer = TaskSerializer(instance=queryset, many=True)
        return serializer.data

    def create(self, validated_data):
        return TaskList.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance

    class Meta:
        model = TaskList
        fields = (
            'id', 'title', 'tasks'
        )
