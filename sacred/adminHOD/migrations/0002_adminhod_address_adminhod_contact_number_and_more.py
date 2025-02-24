# Generated by Django 5.1.5 on 2025-02-24 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminHOD', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='adminhod',
            name='address',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='adminhod',
            name='contact_number',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='adminhod',
            name='gender',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='adminhod',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='admin_img/'),
        ),
        migrations.AddField(
            model_name='adminhod',
            name='role',
            field=models.CharField(default='HOD', max_length=10),
        ),
    ]
