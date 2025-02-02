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
        fields = ['username','first_name','last_name','user_type']

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
    name = CustomUserSerializer()
    class_id=ClassModelSerializer()

    class Meta:
        model = Students
        fields = '__all__'
    
    def create(self, validated_data):
        name_data=validated_data.pop('name')
        class_data=validated_data.pop('class_id')
        user=CustomUser.objects.create(**name_data)
        class_id=ClassModel.objects.get(name=class_data.get('name'))
        
        student=Students.objects.create(name=user,class_id=class_id,**validated_data)
        return student
        
        
    def update(self, instance, data):
        # Handle nested 'name' field (CustomUser)
        name_data = data.pop('name', None)
        if name_data:
            # Update related CustomUser instance (instance.name refers to the CustomUser instance)
            instance.name.username = name_data.get('username', instance.name.username)
            instance.name.first_name = name_data.get('first_name', instance.name.first_name)
            instance.name.last_name = name_data.get('last_name', instance.name.last_name)
            instance.name.save()

        # Update the remaining fields of the Students instance
        return super().update(instance, data)


# NotificationStudent Serializer
class NotificationStudentSerializer(serializers.ModelSerializer):
    student = StudentsSerializer()  # Include nested student data

    class Meta:
        model = NotificationStudent
        fields = '__all__'

# Staffs Serializer
class StaffsSerializer(serializers.ModelSerializer):
    name=CustomUserSerializer()
    class Meta:
        model = Staffs
        fields = '__all__'
        
    def create(self, validated_data):
        name_data=validated_data.pop('name')
        user=CustomUser.objects.create(**name_data)
        staff=Staffs.objects.create(name=user,**validated_data)
        return staff
        
        
    def update(self,instance,data):
        name_data=data.pop('name',None)
        
        if name_data:
            username=name_data.get('username',instance.name.username)
            first_name=name_data.get('first_name',instance.name.first_name)
            last_name=name_data.get('last_name',instance.name.last_name)
            
            instance.name.username=username
            instance.name.first_name=first_name
            instance.name.last_name=last_name
            instance.name.save()
        
        # Update the remaining fields of the Staffs instance and return the updated instance
        return super().update(instance,data)
            
            
        
    

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
    
    def create(self, validated_data):
        student=validated_data.pop('student')
        user=Students.objects.get(**student)
        bill=Bill.objects.create(student=user,**validated_data)
        return bill
    
    

# Fee Serializer
class FeeSerializer(serializers.ModelSerializer):
    student = StudentsSerializer()  # Include nested student data

    class Meta:
        model = Fee
        fields = '__all__'
        
    def create(self, validated_data):
        student=validated_data.pop('student')
        user=Students.objects.get(**student)
        fee=Fee.objects.create(student=user,**validated_data)
        return fee
    
    
        
      

# Notice Serializer
class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = '__all__'

# Homework Serializer
class HomeworkSerializer(serializers.ModelSerializer):
    
    class_id=ClassModelSerializer()
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
    uploaded_by=CustomUserSerializer()
    class Meta:
        model = Library
        fields = '__all__'
    
    def create(self, validated_data):
        uploaded_by_data = validated_data.pop('uploaded_by')
        user = CustomUser.objects.get(**uploaded_by_data)
        library = Library.objects.create(uploaded_by=user, **validated_data)
        return library
        
  
            
        

# NotificationStaff Serializer
class NotificationStaffSerializer(serializers.ModelSerializer):
    staff = StaffsSerializer()  # Include nested staff data

    class Meta:
        model = NotificationStaff
        fields = '__all__'