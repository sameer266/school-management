# Generated by Django 5.1.4 on 2025-01-24 11:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeworks', '0011_alter_homeworksubmission_submssion_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='homeworksubmission',
            name='submssion_file',
        ),
        migrations.AddField(
            model_name='homework',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='hw_img/'),
        ),
        migrations.AddField(
            model_name='homeworksubmission',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='hw_submitted_img/'),
        ),
        migrations.AlterField(
            model_name='homeworksubmission',
            name='submssion_date',
            field=models.DateTimeField(default=datetime.datetime(2025, 1, 24, 16, 57, 31, 337323)),
        ),
    ]
