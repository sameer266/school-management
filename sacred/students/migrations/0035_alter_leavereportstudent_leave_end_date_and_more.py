# Generated by Django 5.1.5 on 2025-02-24 15:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0034_alter_leavereportstudent_leave_end_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leavereportstudent',
            name='leave_end_date',
            field=models.DateField(default=datetime.date(2025, 2, 24)),
        ),
        migrations.AlterField(
            model_name='leavereportstudent',
            name='leave_start_date',
            field=models.DateField(default=datetime.date(2025, 2, 24)),
        ),
    ]
