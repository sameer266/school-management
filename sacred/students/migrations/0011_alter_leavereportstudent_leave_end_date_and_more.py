# Generated by Django 5.1.4 on 2025-01-24 11:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0010_alter_leavereportstudent_leave_end_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leavereportstudent',
            name='leave_end_date',
            field=models.DateField(default=datetime.datetime(2025, 1, 24, 16, 57, 31, 319075)),
        ),
        migrations.AlterField(
            model_name='leavereportstudent',
            name='leave_start_date',
            field=models.DateField(default=datetime.datetime(2025, 1, 24, 16, 57, 31, 319075)),
        ),
    ]
