# Generated by Django 5.1.4 on 2025-01-16 03:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeworks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homeworksubmission',
            name='submssion_date',
            field=models.DateTimeField(default=datetime.datetime(2025, 1, 16, 8, 47, 51, 299102)),
        ),
    ]
