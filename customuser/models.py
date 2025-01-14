from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

from staff.models import AdminHOD,Staffs
from students.models import Students

# Create your models here.



class CustomUser(AbstractUser):
    HOD='1'
    STAFF='2'
    STUDENT='3'
    
    user_type_data=((HOD,"HOD"),(STAFF,"Staff"),(STUDENT,"Student"))
    user_type=models.CharField(max_length=10,choices=user_type_data)

    def __str__(self):
        return self.full_name



# Creating Django Signals

# Automatically insert data in HOD, Staff, or Student when a CustomUser is created
@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.user_type == CustomUser.HOD:
            AdminHOD.objects.create(admin=instance)
        elif instance.user_type == CustomUser.STAFF:
            Staffs.objects.create(admin=instance)
        elif instance.user_type == CustomUser.STUDENT:
            Students.objects.create(admin=instance, class_id=ClassModel.objects.get(id=1), address="", profile_pic="", gender="")


@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    if instance.user_type == CustomUser.HOD:
        instance.adminhod.save()
    elif instance.user_type == CustomUser.STAFF:
        instance.staffs.save()
    elif instance.user_type == CustomUser.STUDENT:
        instance.students.save()
