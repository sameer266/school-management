from django.db import models
import datetime

from customuser.models import CustomUser
from classes.models import ClassModel
# Create your models here.

class Students(models.Model):
    name=models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    gender=models.CharField(max_length=10)
    profile_picture=models.TextField()
    address=models.TextField()
    class_id=models.ForeignKey(ClassModel,on_delete=models.DO_NOTHING)
    contact_number=models.CharField(max_length=10)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f" Student {self.name}"


class LeaveReportStudent:
    student=models.ForeignKey(Students,on_delete=models.CASCADE)
    leave_start_date=models.DateField(default=datetime.noew)
    leave_end_date=models.DateField(default=datetime.now)
    leave_mesasge=models.TextField()
    leave_status_choices=[
        ('pending','Pending'),
        ('approved','Approved'),
        ('rejected','Rejected')
    ]
    leave_status=models.CharField(default='pending',choices=leave_status_choices)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return f"Leave Report of Student {self.student}"
    