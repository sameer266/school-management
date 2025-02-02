from django.db import models


# Create your models here.

class ClassModel(models.Model):
    name=models.CharField(max_length=100)
    created_at=models.DateTimeField(auto_now_add=True) 
    updated_at=models.DateField(auto_now=True)
    
    def __str__(self):
        return  f'Class {self.name}'
    

