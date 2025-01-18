from django.db import models

# Create your models here.
class AdminHOD(models.Model):
    admin = models.OneToOneField(
        to='customuser.CustomUser', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"HOD: {self.admin.username}"
