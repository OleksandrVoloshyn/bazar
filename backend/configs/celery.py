import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'configs.settings')

app = Celery('configs')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    "send_mail_to_remove_user": {
        'task': 'core.services.email_service.remove_users',
        'schedule': crontab(day_of_month=1)
    }
}
