# Generated by Django 2.0.3 on 2018-05-16 00:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tasklist',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
