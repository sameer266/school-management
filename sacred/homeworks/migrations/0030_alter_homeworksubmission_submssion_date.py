# Generated by Django 5.1.5 on 2025-02-06 15:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeworks', '0029_alter_homeworksubmission_submssion_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homeworksubmission',
            name='submssion_date',
            field=models.DateTimeField(default=datetime.datetime(2025, 2, 6, 15, 52, 37, 329445, tzinfo=datetime.timezone.utc)),
        ),
    ]
