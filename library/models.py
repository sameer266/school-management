from django.db import models

from customuser.models import CustomUser
# Create your models here.
class Library(models.Model):
    title = models.CharField(max_length=255)  # The title of the book
    pdf_file = models.TextField()  # The uploaded PDF file
    uploaded_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  # Who uploaded the book (Staff/Admin)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
