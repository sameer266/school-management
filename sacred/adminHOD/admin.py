from django.contrib import admin

from accounts.models import Bill, Fee
from customuser.models import CustomUser
from classes.models import ClassModel
from exams.models import Exam, ExamResult
from homeworks.models import Homework, HomeworkSubmission
from library.models import Library
from notifications.models import NotificationStaff, NotificationStudent
from staff.models import Staffs, LeaveReportStaff
from adminHOD.models import AdminHOD
from students.models import Students, LeaveReportStudent
from subjects.models import Subjects
from attendence.models import Attendence, AttendanceReport
from notice.models import Notice

# Register models
admin.site.register(CustomUser)
admin.site.register(Exam)
admin.site.register(ExamResult)
admin.site.register(Homework)
admin.site.register(HomeworkSubmission)
admin.site.register(Library)
admin.site.register(NotificationStaff)
admin.site.register(NotificationStudent)
admin.site.register(Staffs)
admin.site.register(LeaveReportStaff)
admin.site.register(AdminHOD)
admin.site.register(Students)
admin.site.register(LeaveReportStudent)
admin.site.register(Subjects)
admin.site.register(Attendence)
admin.site.register(AttendanceReport)
admin.site.register(Bill)
admin.site.register(Fee)
admin.site.register(Notice)

class ClassModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'total_students')  # Include the custom method in `list_display`

    def total_students(self, obj):
        return Students.objects.filter(class_id=obj).count()  # Count students for this class

    total_students.short_description = 'Total Students'  # Name to display in the admin panel


# Register the ClassModel with the customized admin
admin.site.register(ClassModel, ClassModelAdmin)
