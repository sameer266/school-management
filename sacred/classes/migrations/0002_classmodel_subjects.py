# Generated by Django 5.1.4 on 2025-01-30 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0001_initial'),
        ('subjects', '0002_remove_subjects_class_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='classmodel',
            name='subjects',
            field=models.ManyToManyField(to='subjects.subjects'),
        ),
    ]
