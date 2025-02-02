from django.db import models
from django.utils.timezone import now

from classes.models import ClassModel



class Staffs(models.Model):
    name = models.OneToOneField(
        to='customuser.CustomUser', on_delete=models.CASCADE
    )
    class_teacher=models.OneToOneField(ClassModel,on_delete=models.CASCADE)
    teaches_classes = models.ManyToManyField(
        'classes.ClassModel', related_name='teachers'
    )
    subject_teaches=models.ForeignKey('subjects.Subjects',on_delete=models.CASCADE,null=True,blank=True)
    address = models.TextField()
    contact_number = models.CharField(max_length=10)
    image = models.ImageField(upload_to="staff_img/",blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Staff: {self.name}"


class LeaveReportStaff(models.Model):
    staff = models.ForeignKey(Staffs, on_delete=models.CASCADE)
    leave_start_date = models.DateTimeField(default=now)
    leave_end_date = models.DateTimeField(default=now)
    leave_message = models.TextField()
    leave_status_choices = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    leave_status = models.CharField(
        max_length=10, choices=leave_status_choices, default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Leave for Staff {self.staff.admin.username}"
