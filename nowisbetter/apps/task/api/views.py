import datetime
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from task.api.serializers import TaskListSerializer
from task.api.serializers import TaskFormSerializer
from task.models import Task
from task.models import TaskList
from task.utils import report_tasks
from task.utils import default_report_message
from task.utils import create_pdf_file


class TaskCreateView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskFormSerializer

    def create(self, request):
        if 'user_ids' not in request.data:
            request.data.update({'user_ids': [request.user.id]})
        return super(TaskCreateView, self).create(request)        


class TaskUpdateView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskFormSerializer

    def patch(self, request, pk):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskListView(viewsets.ModelViewSet):
    queryset = TaskList.objects.filter(is_active=True)
    serializer_class = TaskListSerializer
    search_fields = ('title', 'tasks__user__username', 'is_done')
    filter_fields = ('tasks__user__username', 'is_done')

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReportPDFView(APIView):
    def get(self, request):
        date_report = request.query_params.get('date', datetime.datetime.now())
        if isinstance(date_report, str):
            date_report = datetime.datetime.strptime(date_report, '%d-%m-%Y')
        raw_report = report_tasks(date_report)
        report = default_report_message(raw_report)

        pdf_path = create_pdf_file(report)

        return Response({'file_path': pdf_path}, status=status.HTTP_200_OK)
