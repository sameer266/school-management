from django.db import models
from django.utils import timezone
from students.models import Students
from subjects.models import Subjects
from classes.models import ClassModel
from staff.models import Staffs
# Create your models here.
class Homework(models.Model):
    subject=models.ForeignKey(Subjects,on_delete=models.CASCADE)
    description=models.TextField(null=True)
    image=models.ImageField(upload_to="hw_img/",null=True,blank=True)
    class_id=models.ForeignKey(ClassModel,on_delete=models.CASCADE)
    created_by=models.ForeignKey(Staffs,on_delete=models.CASCADE,null=True)
    due_date=models.DateTimeField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Homework: {self.subject} Subject for Class {self.class_id.name}"
    
    

class HomeworkSubmission(models.Model):
    student=models.ForeignKey(Students,on_delete=models.CASCADE)
    homework=models.ForeignKey(Homework,on_delete=models.CASCADE)
    submssion_date = models.DateTimeField(default=timezone.now)  # ✅ Correct

    image=models.ImageField(upload_to="hw_submitted_img/",null=True,blank=True)
    status=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'Submitted by {self.student} status : {self.status}'
    
    
        