# Generated by Django 5.1.5 on 2025-02-06 15:58

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0029_alter_leavereportstudent_leave_end_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leavereportstudent',
            name='leave_end_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='leavereportstudent',
            name='leave_start_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
