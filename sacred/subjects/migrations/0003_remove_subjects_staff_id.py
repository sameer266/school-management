# Generated by Django 5.1.4 on 2025-01-30 09:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('subjects', '0002_remove_subjects_class_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subjects',
            name='staff_id',
        ),
    ]
