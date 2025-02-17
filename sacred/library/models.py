from django.db import models

from customuser.models import CustomUser
# Create your models here.

class Library(models.Model):
    title = models.CharField(max_length=255)  # The title of the book
    pdf_file = models.FileField(upload_to="library_img/")  # The uploaded PDF file
    uploaded_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  # Who uploaded the book (Staff/Admin)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def delete(self, *args, **kwargs):
        # Delete the file from storage before deleting the object
        if self.pdf_file:
            self.pdf_file.delete(save=False)
        super().delete(*args, **kwargs)

    def save(self, *args, **kwargs):
        if self.pk:  # Check if the instance already exists (is an update)
            old_instance = Library.objects.get(pk=self.pk)
            if old_instance.pdf_file != self.pdf_file:  # If the file is changing
                # Delete the old file
                old_instance.pdf_file.delete(save=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
