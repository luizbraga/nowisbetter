from django.urls import path
from task.api.views import TaskCreateView
from task.api.views import TaskUpdateView
from task.api.views import TaskListView
from task.api.views import ReportPDFView


urlpatterns = [
    path('create/', TaskCreateView.as_view()),
    path('update/<pk>', TaskUpdateView.as_view()),
    path('lists/', TaskListView.as_view(
        {'get': 'list'}), name='task_list_view'),
    path('list/<pk>', TaskListView.as_view(
        {'get': 'retrieve'}), name='task_list_detail'),
    path('list/create/', TaskListView.as_view(
        {'post': 'create'}), name='task_list_create'),
    path('list/update/<pk>', TaskListView.as_view(
        {'put': 'update'}), name='task_list_update'),
    path('report/', ReportPDFView.as_view()),
]
