# Generated by Django 5.1.5 on 2025-02-06 16:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeworks', '0031_alter_homeworksubmission_submssion_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homeworksubmission',
            name='submssion_date',
            field=models.DateTimeField(default=datetime.date(2025, 2, 6)),
        ),
    ]
