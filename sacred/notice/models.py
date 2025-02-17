from django.db import models

# Create your models here.

class Notice(models.Model):
    AUDIENCE_CHOICE=[
        ('staff','Staff'),
        ('student','Student'),
        ('both','Both'),
    ]
    
    title=models.CharField(max_length=255)
    message=models.TextField(null=True,blank=True)
    image=models.ImageField(upload_to='notice_img/',null=True,blank=True)
    audience=models.CharField(max_length=10,choices=AUDIENCE_CHOICE, default='both')
    published_date=models.DateTimeField(auto_now_add=True)
    is_active=models.BooleanField(default=True)
    
    def delete(self, *args, **kwargs):
        # Check if an image exists and delete it
        if self.image:
            self.image.delete(save=False)  # Delete the file from storage without saving the model again
        super(Notice, self).delete(*args, **kwargs)  # Call the parent class's delete method
        
    def __str__(self):
        return f"{self.title}" 