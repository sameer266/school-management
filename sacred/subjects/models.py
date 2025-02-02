from django.db import models


from classes.models import ClassModel
from staff.models import Staffs
# Create your models here.


class Subjects(models.Model):
    subject_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Subject: {self.subject_name}"