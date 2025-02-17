from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from classes.models import ClassModel
from students.models import Students



class Attendence(models.Model):
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    attendence_date = models.DateField(default=timezone.now().date())
    status = models.BooleanField(default=False)
    remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return f"Attendance {self.student} on {self.attendence_date}"


class AttendanceReport(models.Model):
    class_id = models.ForeignKey(ClassModel, on_delete=models.CASCADE)  # Track the class
    report_date = models.DateField(default=timezone.now().date())  # Date for the report
    total_present = models.IntegerField(default=0)  # Total number of students present
    total_absent = models.IntegerField(default=0)  # Total number of students absent
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Attendance Report for Class {self.class_id} on {self.report_date}"


@receiver(post_save, sender=Attendence)
def update_attendance_report(sender, instance, **kwargs):
    """
    Signal to update or create AttendanceReport for a class whenever Attendance is saved.
    """
    # Get the class of the student
    class_instance = instance.student.class_id

    # Get the attendance date
    report_date = instance.attendence_date

    # Count attendance for the class on this date
    total_present = Attendence.objects.filter(
        student__class_id=class_instance,
        attendence_date=report_date,
        status=True
    ).count()

    total_absent = Attendence.objects.filter(
        student__class_id=class_instance,
        attendence_date=report_date,
        status=False
    ).count()

    # Update or create the AttendanceReport
    AttendanceReport.objects.update_or_create(
        class_id=class_instance,
        report_date=report_date,
        defaults={
            'total_present': total_present,
            'total_absent': total_absent,
        }
    )
