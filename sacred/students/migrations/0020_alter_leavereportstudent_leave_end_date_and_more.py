# Generated by Django 5.1.4 on 2025-01-25 10:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0019_alter_leavereportstudent_leave_end_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leavereportstudent',
            name='leave_end_date',
            field=models.DateField(default=datetime.datetime(2025, 1, 25, 16, 20, 41, 944746)),
        ),
        migrations.AlterField(
            model_name='leavereportstudent',
            name='leave_start_date',
            field=models.DateField(default=datetime.datetime(2025, 1, 25, 16, 20, 41, 944746)),
        ),
    ]
