# Generated by Django 5.1.4 on 2025-01-21 03:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendence', '0009_alter_attendancereport_report_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendancereport',
            name='report_date',
            field=models.DateField(default=datetime.datetime(2025, 1, 21, 9, 37, 16, 385229)),
        ),
        migrations.AlterField(
            model_name='attendence',
            name='attendence_date',
            field=models.DateField(default=datetime.datetime(2025, 1, 21, 9, 37, 16, 385229)),
        ),
    ]
