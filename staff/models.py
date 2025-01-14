from django.db import models
import datetime

from customuser.models import CustomUser

# Create your models here.

class AdminHOD(models.Model):
    name=models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    

class Staffs(models.Model):
    name=models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    address=models.TextField()
    contact_number=models.CharField(max_length=10)
    profile_picture=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'Staff {self.name}'
    

class LeaveReportStaff(models.Model):
    staff=models.ForeignKey(Staffs,on_delete=models.CASCADE)
    leave_start_date=models.DateTimeField(default=datetime.now)
    leave_end_date=models.DateTimeField(default=datetime.now)
    leave_message=models.TextField()
    leave_status_choices=[ 
                          ('pending','Pending'),
                          ('approved','Approved'),
                          ('rejected','Rejected')]
    leave_status=models.CharField(default='pending',choices=leave_status_choices)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f" Leave for Staff {self.staff}"