from rest_framework import serializers
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

# CustomUser Serializer
class CustomUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['username','first_name','user_type']

# ClassModel Serializer
class ClassModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassModel
        fields = '__all__'

# Exam Serializer
class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

# ExamResult Serializer
class ExamResultSerializer(serializers.ModelSerializer):
    exam = ExamSerializer()  # Include nested exam data

    class Meta:
        model = ExamResult
        fields = '__all__'

# Students Serializer
class StudentsSerializer(serializers.ModelSerializer):
    name=CustomUserSerializer()
    class Meta:
        model = Students
        fields = '__all__'



# NotificationStudent Serializer
class NotificationStudentSerializer(serializers.ModelSerializer):
    student = StudentsSerializer()  # Include nested student data

    class Meta:
        model = NotificationStudent
        fields = '__all__'

# Staffs Serializer
class StaffsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staffs
        fields = '__all__'

# LeaveReportStaff Serializer
class LeaveReportStaffSerializer(serializers.ModelSerializer):
    staff = StaffsSerializer()  # Include nested staff data

    class Meta:
        model = LeaveReportStaff
        fields = '__all__'

# AdminHOD Serializer
class AdminHODSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminHOD
        fields = '__all__'

# LeaveReportStudent Serializer
class LeaveReportStudentSerializer(serializers.ModelSerializer):
    student = StudentsSerializer()  # Include nested student data

    class Meta:
        model = LeaveReportStudent
        fields = '__all__'

# Subjects Serializer
class SubjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects
        fields = '__all__'

# Attendence Serializer
class AttendenceSerializer(serializers.ModelSerializer):
    student = StudentsSerializer()  # Include nested student data

    class Meta:
        model = Attendence
        fields = '__all__'

# AttendanceReport Serializer
class AttendanceReportSerializer(serializers.ModelSerializer):
    attendence = AttendenceSerializer()  # Include nested attendence data

    class Meta:
        model = AttendanceReport
        fields = '__all__'

# Bill Serializer
class BillSerializer(serializers.ModelSerializer):
    student = StudentsSerializer()  # Include nested student data

    class Meta:
        model = Bill
        fields = '__all__'

# Fee Serializer
class FeeSerializer(serializers.ModelSerializer):
    student = StudentsSerializer()  # Include nested student data

    class Meta:
        model = Fee
        fields = '__all__'

# Notice Serializer
class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = '__all__'

# Homework Serializer
class HomeworkSerializer(serializers.ModelSerializer):
    subject = SubjectsSerializer()  # Include nested subject data

    class Meta:
        model = Homework
        fields = '__all__'
        
        
# HomeworkSubmission Serializer
class HomeworkSubmissionSerializer(serializers.ModelSerializer):
    student = StudentsSerializer()  # Include nested student data
    homework = HomeworkSerializer()  # Include nested homework data

    class Meta:
        model = HomeworkSubmission
        fields = '__all__'
        

# Library Serializer
class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = '__all__'

# NotificationStaff Serializer
class NotificationStaffSerializer(serializers.ModelSerializer):
    staff = StaffsSerializer()  # Include nested staff data

    class Meta:
        model = NotificationStaff
        fields = '__all__'