from django.db import models

# Create your models here.
class AdminHOD(models.Model):
    admin = models.OneToOneField(
        to='customuser.CustomUser', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    address = models.TextField(null=True,blank=True)
    contact_number = models.CharField(max_length=10,null=True,blank=True)
    image = models.ImageField(upload_to="admin_img/",blank=True, null=True)
    gender = models.CharField(max_length=10,null=True,blank=True)
    role = models.CharField(max_length=10,default='HOD')
    
    def delete(self, *args, **kwargs):
        # Check if image exists and delete it
        if self.image:
            self.image.delete(save=False)  # Deletes the file associated with the model instance
        super(AdminHOD, self).delete(*args, **kwargs)  # Call the parent class's delete method
        
    def __str__(self):
        return f"HOD: {self.admin.username}"
   
