from django.db import models

from classes.models import ClassModel
from students.models import Students
from subjects.models import Subjects

# Create your models here.

class Exam(models.Model):
    class_id=models.OneToOneField(ClassModel,on_delete=models.CASCADE)
    image=models.ImageField(upload_to='exam_img',blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateField(auto_now=True)
    
    def delete(self, *args, **kwargs):
        # Check if an image exists and delete it
        if self.image:
            self.image.delete(save=False)  # Delete the file from storage without saving the model again
        super(Exam, self).delete(*args, **kwargs)  # Call the parent class's delete method
        
    def __str__(self):
        return f" Exam of class {self.class_id.name}"
    
class ExamResult(models.Model):
    exam_id = models.ForeignKey(Exam, on_delete=models.CASCADE)  # Exam for which the result is
    student_id = models.ForeignKey(Students, on_delete=models.CASCADE)  # Student taking the exam
    subject = models.ForeignKey(Subjects, on_delete=models.CASCADE)  # Subject for the marks
    marks_obtained = models.FloatField()  # Marks scored by the student in the subject
    grade = models.CharField(max_length=2, blank=True, null=True)  # Grade based on marks (e.g., A, B, C, etc.)
    image=models.ImageField(upload_to="result_img/",null=True,blank=True) #optional
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Calculate the grade based on marks
    def calculate_grade(self):
        if self.marks_obtained >= 90:
            return 'A+'
        elif self.marks_obtained >= 80:
            return 'A'
        elif self.marks_obtained >= 70:
            return 'B+'
        elif self.marks_obtained >= 60:
            return 'B'
        elif self.marks_obtained >= 50:
            return 'C+'
        else:
            return 'C'

    def save(self, *args, **kwargs):
        # Calculate the grade before saving
        self.grade = self.calculate_grade()
        super(ExamResult, self).save(*args, **kwargs)

    class Meta:
        # Ensure a student cannot have multiple results for the same exam and subject
        unique_together = ['exam_id', 'student_id', 'subject']

    def __str__(self):
        return f"Result for {self.student_id} in {self.exam_id}, {self.subject}: {self.marks_obtained} marks"