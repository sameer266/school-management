from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from  staff.models import Staffs,LeaveReportStaff
from students.models import Students,LeaveReportStudent
from subjects.models import Subjects
from classes.models import ClassModel
from customuser.models import CustomUser
from notice.models import Notice
from notifications.models import NotificationStaff,NotificationStudent
from accounts.models import Bill,Fee
from exams.models import Exam,ExamResult
from library.models import Library
from homeworks.models import Homework
from attendence.models import Attendence, AttendanceReport

from sacred.serializer import *  # Assuming your serializers are defined in this module

# Admin Home API View
class AdminHomeAPIView(APIView):
    def get(self, request):
        return Response({"message": "Welcome to the Admin Home."})

# Staff API Views
class AddStaffAPIView(APIView):
    def post(self, request):
        serializer = StaffsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageStaffAPIView(APIView):
    def get(self, request):
        staff = Staffs.objects.all()
        serializer = StaffsSerializer(staff, many=True)
        return Response(serializer.data)

class EditStaffAPIView(APIView):
    def get(self, request, staff_id):
        staff = get_object_or_404(Staffs, id=staff_id)
        serializer = StaffsSerializer(staff)
        return Response(serializer.data)

    def put(self, request, staff_id):
        staff = get_object_or_404(Staffs, id=staff_id)
        serializer = StaffsSerializer(staff, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteStaffAPIView(APIView):
    def delete(self, request, staff_id):
        staff = get_object_or_404(Staffs, id=staff_id)
        staff.delete()
        return Response({"message": "Staff deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

# Subject API Views (Updated from Course API Views)
class AddSubjectAPIView(APIView):
    def post(self, request):
        serializer = SubjectSerializer(data=request.data)  # Updated to SubjectSerializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageSubjectAPIView(APIView):
    def get(self, request):
        subjects = Subjects.objects.all()  # Updated to Subjects model
        serializer = SubjectSerializer(subjects, many=True)  # Updated to SubjectSerializer
        return Response(serializer.data)

class EditSubjectAPIView(APIView):
    def get(self, request, subject_id):
        subject = get_object_or_404(Subjects, id=subject_id)  # Updated to Subjects model
        serializer = SubjectSerializer(subject)  # Updated to SubjectSerializer
        return Response(serializer.data)

    def put(self, request, subject_id):
        subject = get_object_or_404(Subjects, id=subject_id)  # Updated to Subjects model
        serializer = SubjectSerializer(subject, data=request.data)  # Updated to SubjectSerializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteSubjectAPIView(APIView):
    def delete(self, request, subject_id):
        subject = get_object_or_404(Subjects, id=subject_id)  # Updated to Subjects model
        subject.delete()
        return Response({"message": "Subject deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

# Leave API Views for Staff and Students
class StudentLeaveView(APIView):
    def get(self, request):
        leaves = Leave.objects.filter(student__isnull=False)  # Assuming Leave has a reference to students
        serializer = LeaveSerializer(leaves, many=True)
        return Response(serializer.data)

class StudentLeaveApproveView(APIView):
    def post(self, request, leave_id):
        leave = get_object_or_404(Leave, id=leave_id)
        leave.status = 'Approved'  # Assuming Leave model has a status field
        leave.save()
        return Response({"message": "Student leave approved."}, status=status.HTTP_200_OK)

class StudentLeaveRejectView(APIView):
    def post(self, request, leave_id):
        leave = get_object_or_404(Leave, id=leave_id)
        leave.status = 'Rejected'  # Assuming Leave model has a status field
        leave.save()
        return Response({"message": "Student leave rejected."}, status=status.HTTP_200_OK)

class StaffLeaveView(APIView):
    def get(self, request):
        leaves = Leave.objects.filter(staff__isnull=False)  # Assuming Leave has a reference to staff
        serializer = LeaveSerializer(leaves, many=True)
        return Response(serializer.data)

class StaffLeaveApproveView(APIView):
    def post(self, request, leave_id):
        leave = get_object_or_404(Leave, id=leave_id)
        leave.status = 'Approved'  # Assuming Leave model has a status field
        leave.save()
        return Response({"message": "Staff leave approved."}, status=status.HTTP_200_OK)

class StaffLeaveRejectView(APIView):
    def post(self, request, leave_id):
        leave = get_object_or_404(Leave, id=leave_id)
        leave.status = 'Rejected'  # Assuming Leave model has a status field
        leave.save()
        return Response({"message": "Staff leave rejected."}, status=status.HTTP_200_OK)

# Attendance API Views
class AdminViewAttendanceAPIView(APIView):
    def get(self, request):
        # Assuming there's an Attendance model to fetch data from
        attendance = Attendance.objects.all()  
        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data)

class AdminGetAttendanceDatesAPIView(APIView):
    def get(self, request):
        # Assuming you need a list of all unique attendance dates
        dates = Attendance.objects.values('date').distinct()
        return Response(dates)

class AdminGetAttendanceStudentAPIView(APIView):
    def get(self, request, student_id):
        # Assuming you want attendance for a particular student
        attendance = Attendance.objects.filter(student_id=student_id)
        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data)
