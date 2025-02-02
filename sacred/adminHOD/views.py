from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Count
from staff.models import Staffs, LeaveReportStaff
from students.models import Students, LeaveReportStudent
from subjects.models import Subjects
from classes.models import ClassModel
from customuser.models import CustomUser
from notice.models import Notice
from notifications.models import NotificationStaff, NotificationStudent
from accounts.models import Bill, Fee
from exams.models import Exam, ExamResult
from library.models import Library
from homeworks.models import Homework
from attendence.models import Attendence, AttendanceReport
from rest_framework.authentication import BasicAuthentication
from sacred.serializer import *  # Assuming your serializers are defined in this module

# ============= Admin Home API View =======================
class AdminHomeAPIView(APIView):
    """
    API view to get the count of total staff, students, and subjects.
    """
    def get(self, request):
        total_staff = Staffs.objects.all().count()
        total_students = Students.objects.all().count()
        total_subjects = Subjects.objects.all().count()
        data = {
            "total_staffs": total_staff,
            "total_students": total_students,
            "total_subjects": total_subjects
        }
        return Response({"success": True, "message": "Welcome Admin", "data": data}, status=200)

# ---------------->>> Staff <<-------------------

# =================  Add  Staff Views ======================
class AddStaffAPIView(APIView):
    """
    API view to add a new staff member.
    """
    def post(self, request):
        serializer = StaffsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ======= Get all Staff data ==========
class ManageStaffAPIView(APIView):
    """
    API view to get all staff members.
    """
    def get(self, request):
        staff = Staffs.objects.all()
        serializer = StaffsSerializer(staff, many=True)
        return Response(serializer.data)

class ViewOneStaffAPIView(APIView):
    """
    API view to get a single staff member by ID.
    """
    def get(self, request, id):
        staff = Staffs.objects.get(id=id)
        serializer = StaffsSerializer(staff)
        return Response({"success": True, "message": serializer.data}, status=200)

# ========= Edit one Staff data ================
class EditStaffAPIView(APIView):
    """
    API view to edit a staff member's data.
    """
    authentication_classes = [BasicAuthentication]

    def get(self, request, staff_id):
        staff = get_object_or_404(Staffs, id=staff_id)
        serializer = StaffsSerializer(staff)
        return Response(serializer.data)

    def patch(self, request, staff_id):
        staff = get_object_or_404(Staffs, id=staff_id)
        serializer = StaffsSerializer(staff, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ========= Delete Staff Data ===============
class DeleteStaffAPIView(APIView):
    """
    API view to delete a staff member by ID.
    """
    def delete(self, request, staff_id):
        staff = get_object_or_404(Staffs, id=staff_id)
        staff.delete()
        return Response({"message": "Staff deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

# ----------->>>>> Subject <<<---------------

# =================== Subject API Views =============
class AddSubjectAPIView(APIView):
    """
    API view to add a new subject.
    """
    def post(self, request):
        serializer = SubjectsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageSubjectAPIView(APIView):
    """
    API view to get all subjects.
    """
    def get(self, request):
        subjects = Subjects.objects.all()
        serializer = SubjectsSerializer(subjects, many=True)
        return Response(serializer.data)

class EditSubjectAPIView(APIView):
    """
    API view to edit a subject's data.
    """
    def get(self, request, subject_id):
        subject = get_object_or_404(Subjects, id=subject_id)
        serializer = SubjectsSerializer(subject)
        return Response(serializer.data)

    def patch(self, request, subject_id):
        subject = get_object_or_404(Subjects, id=subject_id)
        serializer = SubjectsSerializer(subject, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteSubjectAPIView(APIView):
    """
    API view to delete a subject by ID.
    """
    def delete(self, request, subject_id):
        subject = get_object_or_404(Subjects, id=subject_id)
        subject.delete()
        return Response({"message": "Subject deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

# ------------>>>>> Staff and Student Leave  <<<<--------------------

# ====================  Student Leave Api View =============
class StudentLeaveView(APIView):
    """
    API view to get all student leave requests.
    """
    def get(self, request):
        leaves = LeaveReportStudent.objects.filter(student__isnull=False)
        serializer = LeaveReportStudentSerializer(leaves, many=True)
        return Response(serializer.data)

class StudentLeaveApproveView(APIView):
    """
    API view to approve a student leave request.
    """
    def post(self, request, leave_id):
        leave = get_object_or_404(LeaveReportStudent, id=leave_id)
        leave.status = 'Approved'
        leave.save()
        return Response({"message": "Student leave approved."}, status=status.HTTP_200_OK)

class StudentLeaveRejectView(APIView):
    """
    API view to reject a student leave request.
    """
    def post(self, request, leave_id):
        leave = get_object_or_404(LeaveReportStudent, id=leave_id)
        leave.status = 'Rejected'
        leave.save()
        return Response({"message": "Student leave rejected."}, status=status.HTTP_200_OK)

class StaffLeaveView(APIView):
    """
    API view to get all staff leave requests.
    """
    def get(self, request):
        leaves = LeaveReportStaff.objects.filter(staff__isnull=False)
        serializer = LeaveReportStaffSerializer(leaves, many=True)
        return Response(serializer.data)

class StaffLeaveApproveView(APIView):
    """
    API view to approve a staff leave request.
    """
    def post(self, request, leave_id):
        leave = get_object_or_404(LeaveReportStaff, id=leave_id)
        leave.status = 'Approved'
        leave.save()
        return Response({"message": "Staff leave approved."}, status=status.HTTP_200_OK)

class StaffLeaveRejectView(APIView):
    """
    API view to reject a staff leave request.
    """
    def post(self, request, leave_id):
        leave = get_object_or_404(LeaveReportStaff, id=leave_id)
        leave.status = 'Rejected'
        leave.save()
        return Response({"message": "Staff leave rejected."}, status=status.HTTP_200_OK)

# ====================== Attendance API Views ===================

# -------------->>>> Attendance <<<----------------
class AdminViewAttendanceAPIView(APIView):
    """
    API view to get all attendance records.
    """
    def get(self, request):
        attendance = Attendence.objects.all()
        serializer = AttendenceSerializer(attendance, many=True)
        return Response(serializer.data)

class AdminGetAttendanceDatesAPIView(APIView):
    """
    API view to get all unique attendance dates.
    """
    def get(self, request):
        dates = Attendence.objects.values('date').distinct()
        return Response(dates)

class AdminGetAttendanceStudentAPIView(APIView):
    """
    API view to get attendance records for a particular student.
    """
    def get(self, request, student_id):
        attendance = Attendence.objects.filter(student_id=student_id)
        serializer = AttendenceSerializer(attendance, many=True)
        return Response(serializer.data)

# ----------->>> Admin Profile <<<----------------

# ================= Admin Profile API Views ==============
class AdminProfileView(APIView):
    """
    API view to get the admin profile.
    """
    def get(self, request):
        user = get_object_or_404(CustomUser, role='Admin')
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

class AdminProfileUpdateView(APIView):
    """
    API view to update the admin profile.
    """
    def patch(self, request):
        user = get_object_or_404(CustomUser, role='Admin')
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --------->>>>> Library <<<--------------------

# ============= Library Management API Views  =============
class AdminViewLibraryAPIView(APIView):
    """
    API view to get all library items.
    """
    def get(self, request):
        library_items = Library.objects.all()
        serializer = LibrarySerializer(library_items, many=True)
        return Response(serializer.data)

class AdminUpdateLibraryAPIView(APIView):
    """
    API view to update a library item.
    """
    def patch(self, request, id):
        library_item = get_object_or_404(Library, id=id)
        serializer = LibrarySerializer(library_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminDeleteLibraryAPIView(APIView):
    """
    API view to delete a library item.
    """
    def delete(self, request, id):
        library_item = get_object_or_404(Library, id=id)
        library_item.delete()
        return Response({"message": "Library item deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

# ---------->>>> Student <<<---------------

# =========== Student Management API Views ===================
class AddStudentAPIView(APIView):
    """
    API view to add a new student.
    """
    def post(self, request):
        serializer = StudentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageStudentAPIView(APIView):
    """
    API view to get all students.
    """
    def get(self, request):
        students = Students.objects.all()
        serializer = StudentsSerializer(students, many=True)
        return Response(serializer.data)

class ViewOneStudentAPIView(APIView):
    """
    API view to get a single student by ID.
    """
    def get(self, request, id):
        student = Students.objects.get(id=id)
        serializer = StudentsSerializer(student)
        return Response({"success": True, "message": serializer.data})

class EditStudentAPIView(APIView):
    """
    API view to edit a student's data.
    """
    def get(self, request, student_id):
        student = get_object_or_404(Students, id=student_id)
        serializer = StudentsSerializer(student)
        return Response(serializer.data)

    def patch(self, request, student_id):
        student = get_object_or_404(Students, id=student_id)
        serializer = StudentsSerializer(student, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteStudentAPIView(APIView):
    """
    API view to delete a student by ID.
    """
    def delete(self, request, student_id):
        student = get_object_or_404(Students, id=student_id)
        student.delete()
        return Response({"message": "Student deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

# ------>>>>>> Email and Username check <<<<---------------

# ============== Email and Username Check API Views ==============
class CheckEmailExistAPIView(APIView):
    """
    API view to check if an email already exists.
    """
    def get(self, request):
        email = request.query_params.get('email')
        user_exists = CustomUser.objects.filter(email=email).exists()
        return Response({"exists": user_exists}, status=status.HTTP_200_OK)

class CheckUsernameExistAPIView(APIView):
    """
    API view to check if a username already exists.
    """
    def get(self, request):
        username = request.query_params.get('username')
        user_exists = CustomUser.objects.filter(username=username).exists()
        return Response({"exists": user_exists}, status=status.HTTP_200_OK)

# ----------->>>>> Fee <<<<<----------------

# ===================== Fee API Views =====================
class AddFeeAPIView(APIView):
    """
    API view to add a new fee.
    """
    def post(self, request):
        serializer = FeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageFeeAPIView(APIView):
    """
    API view to get all fees.
    """
    def get(self, request):
        fees = Fee.objects.all()
        serializer = FeeSerializer(fees, many=True)
        return Response(serializer.data)

class EditFeeAPIView(APIView):
    """
    API view to edit a fee's data.
    """
    def get(self, request, fee_id):
        fee = get_object_or_404(Fee, id=fee_id)
        serializer = FeeSerializer(fee)
        return Response(serializer.data)

    def patch(self, request, fee_id):
        fee = get_object_or_404(Fee, id=fee_id)
        serializer = FeeSerializer(fee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteFeeAPIView(APIView):
    """
    API view to delete a fee by ID.
    """
    def delete(self, request, fee_id):
        fee = get_object_or_404(Fee, id=fee_id)
        fee.delete()
        return Response({"message": "Fee deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

# ----------->>>>> Bill <<<<<----------------

# ===================== Bill API Views =====================
class AddBillAPIView(APIView):
    """
    API view to add a new bill.
    """
    def post(self, request):
        serializer = BillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageBillAPIView(APIView):
    """
    API view to get all bills.
    """
    def get(self, request):
        bills = Bill.objects.all()
        serializer = BillSerializer(bills, many=True)
        return Response(serializer.data)

class EditBillAPIView(APIView):
    """
    API view to edit a bill's data.
    """
    def get(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id)
        serializer = BillSerializer(bill)
        return Response(serializer.data)

    def patch(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id)
        serializer = BillSerializer(bill, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteBillAPIView(APIView):
    """
    API view to delete a bill by ID.
    """
    def delete(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id)
        bill.delete()
        return Response({"message": "Bill deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

# ---------->>>>> Student per Class piechart <<<<<<---------------
class StudentsPerClassAPIView(APIView):
    """
    API view to get the total number of students in each class.
    """
    def get(self, request):
        class_student_count = (
            Students.objects
            .values('class__name')
            .annotate(studentCount=Count('id'))
            .order_by('class__name')
        )
        data = [{"className": item['class__name'], "studentCount": item['studentCount']} for item in class_student_count]
        return Response(data, status=status.HTTP_200_OK)