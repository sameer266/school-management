from django.db import models
import datetime
from students.models import Students

from classes.models import ClassModel
# Create your models here.
class Homework(models.Model):
    title=models.CharField(max_length=255)
    description=models.TextField()
    class_id=models.ForeignKey(ClassModel,on_delete=models.CASCADE)
    due_date=models.DateTimeField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Homework: {self.title} for Class {self.class_id}"
    
    
    
status_choice=[('pending','Pending'), ('submitted','Submitted')]
class HomeworkSubmission(models.Model):
    student=models.ForeignKey(Students,on_delete=models.CASCADE)
    homework=models.ForeignKey(Homework,on_delete=models.CASCADE)
    submssion_date=models.DateTimeField(default=datetime.now)
    submssion_file=models.TextField()
    status=models.CharField(max_length=10,choices=status_choice,default='pending')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'Submitted by {self.student} status : {self.status}'
    
    
        