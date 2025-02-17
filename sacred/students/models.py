from django.db import models
from django.utils import timezone

from classes.models import ClassModel
# Create your models here.

class Students(models.Model):
    name=models.OneToOneField('customuser.CustomUser',on_delete=models.CASCADE)
    roll_no=models.IntegerField(null=False, default=0)
    gender=models.CharField(max_length=10)
    image=models.ImageField(upload_to="student_img/",default="student_img/avatar.jpg")
    address=models.TextField()
    class_id=models.ForeignKey(ClassModel,on_delete=models.DO_NOTHING)
    contact_number=models.CharField(max_length=10)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f" Student {self.name}"


class LeaveReportStudent(models.Model):
    student=models.ForeignKey(Students,on_delete=models.CASCADE)
    leave_start_date=models.DateField(default=timezone.now().date())
    leave_end_date=models.DateField(default=timezone.now().date())
    leave_message=models.TextField()
    leave_status_choices=[
        ('pending','Pending'),
        ('approved','Approved'),
        ('rejected','Rejected')
    ]
    leave_status=models.CharField(max_length=50,default='pending',choices=leave_status_choices)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return f"Leave Report of Student {self.student}"
    