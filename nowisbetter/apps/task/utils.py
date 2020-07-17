from task.models import Task


def report_tasks(date):
    done_tasks = Task.objects.filter(
        is_active=True, is_done=True, done_date=date)
    pending_tasks = Task.objects.filter(
        is_active=True, is_done=False).order_by('deadline')

    return {
        'done': done_tasks,
        'next_tasks': pending_tasks
    }


def default_report_message(report):
    return 'There is {} tasks pending and {} were done today.'.format(
        report['next_tasks'].count(), report['done'].count()
    )


def create_pdf_file(body):
    return
