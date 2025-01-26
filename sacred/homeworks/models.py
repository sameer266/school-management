from django.db import models
from datetime import datetime
from students.models import Students

from classes.models import ClassModel
# Create your models here.
class Homework(models.Model):
    subject=models.CharField(max_length=100)
    description=models.TextField()
    image=models.ImageField(upload_to="hw_img/",null=True,blank=True)
    class_id=models.ForeignKey(ClassModel,on_delete=models.CASCADE)
    due_date=models.DateTimeField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Homework: {self.subject} Subject for Class {self.class_id.name}"
    
    

class HomeworkSubmission(models.Model):
    student=models.ForeignKey(Students,on_delete=models.CASCADE)
    homework=models.ForeignKey(Homework,on_delete=models.CASCADE)
    submssion_date=models.DateTimeField(default=datetime.now())
    image=models.ImageField(upload_to="hw_submitted_img/",null=True,blank=True)
    status=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'Submitted by {self.student} status : {self.status}'
    
    
        