from django.db import models


from classes.models import ClassModel
from staff.models import Staffs
# Create your models here.


class Subjects(models.Model):
    subject_name=models.CharField(max_length=100)
    class_id=models.ForeignKey(ClassModel,on_delete=models.CASCADE)
    staff_id=models.ForeignKey(Staffs,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    