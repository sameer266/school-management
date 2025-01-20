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
from rest_framework.authentication import BasicAuthentication 
from sacred.serializer import *  # Assuming your serializers are defined in this module

# ============= Admin Home API View =======================
class AdminHomeAPIView(APIView):
    def get(self, request):
        total_satff=Staffs.objects.all().count()
        total_students=Students.objects.all().count()
        total_subjects=Subjects.objects.all().count()
        data={
            "total_staffs":total_satff,
            "total_students":total_students,
            "total_subjects":total_subjects
        }
        return Response({"success":True,"message": "Welcome Admin ","data":data},status=200)
    
# ---------------->>> Staff <<-------------------
# =================  Add  Staff Views ======================
class AddStaffAPIView(APIView):
    def post(self, request):
        serializer = StaffsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ======= Get all Staff data ==========
class ManageStaffAPIView(APIView):
    def get(self, request):
        staff = Staffs.objects.all()
        serializer = StaffsSerializer(staff, many=True)
        return Response(serializer.data)


class ViewOneStaffAPIView(APIView):
    def get(self,request,id):
        staff=Staffs.objects.get(id=id)
        serializer=StaffsSerializer(staff)
        return Response({"success":True,"message":serializer.data},status=200)
    
    
# ========= Edit one Staff data ================
class EditStaffAPIView(APIView):
    authentication_classes=[BasicAuthentication]
    
    def get(self, request, staff_id):
        staff = get_object_or_404(Staffs, id=staff_id)
        serializer = StaffsSerializer(staff)
        return Response(serializer.data)

    def patch(self, request, staff_id):
        staff = get_object_or_404(Staffs, id=staff_id)
        
        serializer = StaffsSerializer(staff, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ========= Delete Staff Data ===============
class DeleteStaffAPIView(APIView):
    def delete(self, request, staff_id):
        staff = get_object_or_404(Staffs, id=staff_id)
        staff.delete()
        return Response({"message": "Staff deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


# ----------->>>>> Subject <<<---------------
#=================== Subject API Views============
class AddSubjectAPIView(APIView):
    def post(self, request):
        serializer = SubjectsSerializer(data=request.data)  # Updated to SubjectSerializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageSubjectAPIView(APIView):
    def get(self, request):
        subjects = Subjects.objects.all()  # Updated to Subjects model
        serializer = SubjectsSerializer(subjects, many=True)  # Updated to SubjectSerializer
        return Response(serializer.data)

class EditSubjectAPIView(APIView):
    def get(self, request, subject_id):
        subject = get_object_or_404(Subjects, id=subject_id)  # Updated to Subjects model
        serializer = SubjectsSerializer(subject)  # Updated to SubjectSerializer
        return Response(serializer.data)

    def patch(self, request, subject_id):
        subject = get_object_or_404(Subjects, id=subject_id)  # Updated to Subjects model
        serializer = SubjectsSerializer(subject, data=request.data,partial=True)  # Updated to SubjectSerializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteSubjectAPIView(APIView):
    def delete(self, request, subject_id):
        subject = get_object_or_404(Subjects, id=subject_id)  # Updated to Subjects model
        subject.delete()
        return Response({"message": "Subject deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


# ------------>>>>> Staff and Student Leave  <<<<--------------------
#  ====================  Student Leave Api View =============
class StudentLeaveView(APIView):
    def get(self, request):
        leaves = LeaveReportStudent.objects.filter(student__isnull=False)  
        serializer = LeaveReportStudentSerializer(leaves, many=True)
        return Response(serializer.data)

class StudentLeaveApproveView(APIView):
    def post(self, request, leave_id):
        leave = get_object_or_404(LeaveReportStudent, id=leave_id)
        leave.status = 'Approved'  # Assuming Leave model has a status field
        leave.save()
        return Response({"message": "Student leave approved."}, status=status.HTTP_200_OK)

class StudentLeaveRejectView(APIView):
    def post(self, request, leave_id):
        leave = get_object_or_404(LeaveReportStudent, id=leave_id)
        leave.status = 'Rejected'  # Assuming Leave model has a status field
        leave.save()
        return Response({"message": "Student leave rejected."}, status=status.HTTP_200_OK)

class StaffLeaveView(APIView):
    def get(self, request):
        leaves = LeaveReportStaff.objects.filter(staff__isnull=False)  # Assuming Leave has a reference to staff
        serializer = LeaveReportStaffSerializer(leaves, many=True)
        return Response(serializer.data)

class StaffLeaveApproveView(APIView):
    def post(self, request, leave_id):
        leave = get_object_or_404(LeaveReportStaffSerializer, id=leave_id)
        leave.status = 'Approved'  # Assuming Leave model has a status field
        leave.save()
        return Response({"message": "Staff leave approved."}, status=status.HTTP_200_OK)

class StaffLeaveRejectView(APIView):
    def post(self, request, leave_id):
        leave = get_object_or_404(LeaveReportStaffSerializer, id=leave_id)
        leave.status = 'Rejected'  # Assuming Leave model has a status field
        leave.save()
        return Response({"message": "Staff leave rejected."}, status=status.HTTP_200_OK)

#====================== Attendance API Views ===================
#-------------->>>> Attendence <<<----------------
class AdminViewAttendanceAPIView(APIView):
    def get(self, request):
        # Assuming there's an Attendance model to fetch data from
        attendance = Attendence.objects.all()  
        serializer = AttendenceSerializer(attendance, many=True)
        return Response(serializer.data)

class AdminGetAttendanceDatesAPIView(APIView):
    def get(self, request):
        # Assuming you need a list of all unique attendance dates
        dates = Attendence.objects.values('date').distinct()
        return Response(dates)

class AdminGetAttendanceStudentAPIView(APIView):
    def get(self, request, student_id):
        # Assuming you want attendance for a particular student
        attendance = Attendence.objects.filter(student_id=student_id)
        serializer = AttendenceSerializer(attendance, many=True)
        return Response(serializer.data)


#----------->>> Admin Profile <<<----------------
#================ Admin Profile API Views ==============
class AdminProfileView(APIView):
    def get(self, request):
        # Assuming the admin profile is linked to a user, get the user info
        user = get_object_or_404(CustomUser, role='Admin')  # Assuming role is 'Admin'
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

class AdminProfileUpdateView(APIView):
    def patch(self, request):
        # Assuming the admin is updating their own profile
        user = get_object_or_404(CustomUser, role='Admin')  # Assuming role is 'Admin'
        serializer = CustomUserSerializer(user, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --------->>>>> Library <<<--------------------
#============= Library Management API Views  =============
class AdminViewLibraryAPIView(APIView):
    def get(self, request):
        # Assuming there's a Library model to fetch data from
        library_items = Library.objects.all()
        serializer = LibrarySerializer(library_items, many=True)
        return Response(serializer.data)

class AdminUpdateLibraryAPIView(APIView):
    def patch(self, request, id):
        library_item = get_object_or_404(Library, id=id)
        serializer = LibrarySerializer(library_item, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminDeleteLibraryAPIView(APIView):
    def delete(self, request, id):
        library_item = get_object_or_404(Library, id=id)
        library_item.delete()
        return Response({"message": "Library item deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


# ---------->>>> Student <<<---------------
# =========== Student Management API Views ===================
class AddStudentAPIView(APIView):
    def post(self, request):
        serializer = StudentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ManageStudentAPIView(APIView):
    def get(self, request):
        students = Students.objects.all()
        serializer = StudentsSerializer(students, many=True)
        return Response(serializer.data)
    
    
class ViewOneStudentAPIView(APIView):
    def get(self,request,id):
        student=Students.objects.get(id=id)
        serializer=StudentsSerializer(student)
        return Response({"success":True,"message":serializer.data})
        

class EditStudentAPIView(APIView):
    def get(self, request, student_id):
        student = get_object_or_404(Students, id=student_id)
        serializer = StudentsSerializer(student)
        return Response(serializer.data)

    def patch(self, request, student_id):
        student = get_object_or_404(Students, id=student_id)
        serializer = StudentsSerializer(student, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteStudentAPIView(APIView):
    def delete(self, request, student_id):
        student = get_object_or_404(Students, id=student_id)
        student.delete()
        return Response({"message": "Student deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


# ------>>>>>> Eamil and Username check <<<<---------------
#============== Email and Username Check API Views ==============
class CheckEmailExistAPIView(APIView):
    def get(self, request):
        email = request.query_params.get('email')
        user_exists = CustomUser.objects.filter(email=email).exists()
        return Response({"exists": user_exists}, status=status.HTTP_200_OK)

class CheckUsernameExistAPIView(APIView):
    def get(self, request):
        username = request.query_params.get('username')
        user_exists = CustomUser.objects.filter(username=username).exists()
        return Response({"exists": user_exists}, status=status.HTTP_200_OK)



# ----------->>>>> Fee <<<<<------------------
# ===================== Fee API Views =====================

class AddFeeAPIView(APIView):
    def post(self, request):
        serializer = FeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ManageFeeAPIView(APIView):
    def get(self, request):
        fees = Fee.objects.all()
        serializer = FeeSerializer(fees, many=True)
        return Response(serializer.data)


class EditFeeAPIView(APIView):
    def get(self, request, fee_id):
        fee = get_object_or_404(Fee, id=fee_id)
        serializer = FeeSerializer(fee)
        return Response(serializer.data)

    def patch(self, request, fee_id):
        fee = get_object_or_404(Fee, id=fee_id)
        serializer = FeeSerializer(fee, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteFeeAPIView(APIView):
    def delete(self, request, fee_id):
        fee = get_object_or_404(Fee, id=fee_id)
        fee.delete()
        return Response({"message": "Fee deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


# ----------->>>>> Bill <<<<<----------------
# ===================== Bill API Views =====================

class AddBillAPIView(APIView):
    def post(self, request):
        serializer = BillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ManageBillAPIView(APIView):
    def get(self, request):
        bills = Bill.objects.all()
        serializer = BillSerializer(bills, many=True)
        return Response(serializer.data)



class EditBillAPIView(APIView):
    def get(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id)
        serializer = BillSerializer(bill)
        return Response(serializer.data)

    def patch(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id)
        serializer = BillSerializer(bill, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteBillAPIView(APIView):
    def delete(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id)
        bill.delete()
        return Response({"message": "Bill deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    
    
# ---------->>>>> Student per Class piechart <<<<<<---------------
class StudentsPerClassAPIView(APIView):
    def get(self, request):
        # Get the total number of students in each class using aggregation
        class_student_count = (
            Students.objects
            .values('class__name')  # Assuming 'class' is a ForeignKey field in Students model
            .annotate(studentCount=Count('id'))  # Count students per class
            .order_by('class__name')  # Optionally order by class name
        )
        
        # Format the data to match the frontend requirements
        data = [{"className": item['class__name'], "studentCount": item['studentCount']} for item in class_student_count]
        
        return Response(data, status=status.HTTP_200_OK)