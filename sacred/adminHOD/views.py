from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Count
from datetime import datetime

from adminHOD.models import AdminHOD
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
    API view to get the count of total staff, students, subjects, today's attendance, and total present.
    """
    def get(self, request):
        try:
            total_staff = Staffs.objects.all().count()
            total_students = Students.objects.all().count()
            total_subjects = Subjects.objects.all().count()
            today_absent = Attendence.objects.filter(attendence_date=datetime.now().date(), status=False).count()
            total_present = total_students - today_absent  # Assuming total present is total students minus absents

            data = {
                "total_staffs": total_staff,
                "total_students": total_students,
                "total_subjects": total_subjects,
            
                "today_absent": today_absent,
                "total_present": total_present
            }

            return Response({"success": True, "message": "Welcome Admin", "data": data}, status=200)

        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ----------->>> Admin Profile <<<----------------

# ================= Admin Profile API Views ==============
class AdminProfileView(APIView):
    """
    API view to get the admin profile.
    """
    def get(self, request):
        try:
            user = request.user
            adminHod=AdminHOD.objects.get(admin=user)
            serializer=AdminHODSerializer(adminHod)
            return Response({"success":True,"message":serializer.data},status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AdminProfileUpdateView(APIView):
    """
    API view to update the admin profile.
    """
    def patch(self, request):
        try:
            user = get_object_or_404(CustomUser, role='Admin')
            serializer = CustomUserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ---------------->>> Staff <<-------------------

# =================  Add  Staff Views ======================

class AddStaffAPIView(APIView):
    """
    API view to add a new staff member.
    """
    
    def post(self, request):
        try:
            first_name = request.data.get('first_name')
            last_name = request.data.get('last_name')
            email = request.data.get('email')
            if CustomUser.objects.get(email=email):
                return Response({"success": False, "message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            phone = request.data.get('phone')
            address = request.data.get('address')
            subject_teaches = request.data.get('subjects')
            class_teacher = request.data.get('class_teacher')
            class_teaches = request.data.get('class_teaches', [])  # Assuming class_teaches is a list
            image = request.data.get('image')   
            
            # Check if the email already exists
            if CustomUser.objects.filter(email=email).exists():
                return Response({"success": False, "message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            
            if Staffs.objects.filter(contact_number=phone).exists():
                return Response({"success": False, "message": "Phone number already exists"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create the user
            user = CustomUser.objects.create_user(
                first_name=first_name, 
                last_name=last_name, 
                email=email, 
                username=email,
                user_type='2'
            )
            
            # Get the Subject object (assuming it's a foreign key)
            subject = Subjects.objects.get(subject_name=subject_teaches)

            # Get the class_teacher object (assuming it's a foreign key)
            teacher_class = ClassModel.objects.get(name=class_teacher)
            staff = Staffs.objects.create(
                name=user, 
                contact_number=phone,
                address=address,
                subject_teaches=subject, 
                class_teacher=teacher_class, 
                image=image
            )        
            # Handle the many-to-many relationship for class_teaches
            classes = ClassModel.objects.filter(id__in=class_teaches)  # Get the classes based on the IDs provided
            staff.class_teaches.set(classes)  # This sets the many-to-many relationship

            return Response({
                "success": True, 
                "message": "Staff added successfully", 
                "data": {
                    "staff_id": staff.id, 
                    "staff_name": staff.name.first_name + " " + staff.name.last_name,  # Example: Full Name
                }
            }, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ================= Get Classes and Subjects API View ======================
class GetClassesAndSubjectsAPIView(APIView):
    """
    API view to get all classes and subjects.
    """
    def get(self, request):
        try:
            classes = ClassModel.objects.all()
            subjects = Subjects.objects.all()
            serializer = ClassModelSerializer(classes, many=True)
            serializer2 = SubjectsSerializer(subjects, many=True)
            return Response({"success": True, "classes": serializer.data, "subjects": serializer2.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ======= Get all Staff data ==========
class AllStaffAPIView(APIView):
    """
    API view to get all staff members.
    """
    def get(self, request):
        try:
            staff = Staffs.objects.all().order_by('-class_teacher')
            serializer = StaffsSerializer(staff, many=True)
            return Response({"success": True, "message":  serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ViewOneStaffAPIView(APIView):
    """
    API view to get a single staff member by ID.
    """
    def get(self, request, id):
        try:
            staff = Staffs.objects.get(id=id)
            serializer = StaffsSerializer(staff)
            return Response({"success": True, "message": "Staff fetched successfully", "data": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ========= Edit one Staff data ================
class EditStaffAPIView(APIView):
    def patch(self, request, staff_id):
        try:
            staff = get_object_or_404(Staffs, id=staff_id)
            serializer = StaffsSerializer(staff, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"success": True, "message": "Staff updated successfully", "data": serializer.data}, status=status.HTTP_200_OK)
            return Response({"success": False, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ========= Delete Staff Data ===============
class DeleteStaffAPIView(APIView):
    """
    API view to delete a staff member by ID.
    """
    def delete(self, request, staff_id):
        try:    
            staff = get_object_or_404(Staffs, id=staff_id)
            staff.delete()
            user=CustomUser.objects.get(id=staff.name.id)
            user.delete()
            return Response({"success": True, "message": "Staff deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UpdateStaffImageAPIView(APIView):
    """
    API view to update a staff member's image.
    """
    def post(self, request, staff_id):
        try:
            print(request.data)
            image=request.FILES.get('image')
            if image:
                staff = get_object_or_404(Staffs, id=staff_id)
                staff.image.delete()
                staff.image=image
                staff.save()
                return Response({"success": True, "message": staff.image.url}, status=status.HTTP_200_OK)
            return Response({"success": False, "message": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
            
# ----------->>>>> Subject <<<---------------

# =================== Subject API Views =============
class AddSubjectAPIView(APIView):
    """
    API view to add a new subject.
    """
    def post(self, request):
        try:
            subject_name=request.data.get('subject')
            Subjects.objects.create(subject_name=subject_name)
            return Response({"success": True, "message": "Subject Added Successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"su12ccess": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AllSubjectAPIView(APIView):
    """
    API view to get all subjects.
    """
    def get(self, request):
        try:
            subjects = Subjects.objects.all()
            serializer = SubjectsSerializer(subjects, many=True)
            return Response({"success": True, "message":  serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class EditSubjectAPIView(APIView):
    """
    API view to edit a subject's data.
    """
    def get(self, request, subject_id):
        try:
            subject = get_object_or_404(Subjects, id=subject_id)
            serializer = SubjectsSerializer(subject)
            return Response(serializer.data)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, subject_id):
        try:
            subject = get_object_or_404(Subjects, id=subject_id)
            serializer = SubjectsSerializer(subject, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteSubjectAPIView(APIView):
    """
    API view to delete a subject by ID.
    """
    def delete(self, request, subject_id):
        try:
            subject = get_object_or_404(Subjects, id=subject_id)
            subject.delete()
            return Response({"message": "Subject deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ------------>>>>> Staff and Student Leave  <<<<--------------------

# ====================  Student Leave Api View =============
class StudentLeaveView(APIView):
    """
    API view to get all student leave requests.
    """
    def get(self, request):
        try:
            leaves = LeaveReportStudent.objects.filter(student__isnull=False)
            serializer = LeaveReportStudentSerializer(leaves, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StudentLeaveApproveView(APIView):
    """
    API view to approve a student leave request.
    """
    def post(self, request, leave_id):
        try:
            leave = get_object_or_404(LeaveReportStudent, id=leave_id)
            leave.status = 'Approved'
            leave.save()
            return Response({"message": "Student leave approved."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StudentLeaveRejectView(APIView):
    """
    API view to reject a student leave request.
    """
    def post(self, request, leave_id):
        try:
            leave = get_object_or_404(LeaveReportStudent, id=leave_id)
            leave.status = 'Rejected'
            leave.save()
            return Response({"message": "Student leave rejected."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StaffLeaveView(APIView):
    """
    API view to get all staff leave requests.
    """
    def get(self, request):
        try:
            leaves = LeaveReportStaff.objects.filter(staff__isnull=False)
            serializer = LeaveReportStaffSerializer(leaves, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StaffLeaveApproveView(APIView):
    """
    API view to approve a staff leave request.
    """
    def post(self, request, leave_id):
        try:
            leave = get_object_or_404(LeaveReportStaff, id=leave_id)
            leave.status = 'Approved'
            leave.save()
            return Response({"message": "Staff leave approved."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StaffLeaveRejectView(APIView):
    """
    API view to reject a staff leave request.
    """
    def post(self, request, leave_id):
        try:
            leave = get_object_or_404(LeaveReportStaff, id=leave_id)
            leave.status = 'Rejected'
            leave.save()
            return Response({"message": "Staff leave rejected."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ====================== Attendance API Views ===================

# -------------->>>> Attendance <<<----------------
class AdminViewAttendanceAPIView(APIView):
    """
    API view to get all attendance records.
    """
    def get(self, request):
        try:
            attendance = Attendence.objects.all()
            serializer = AttendenceSerializer(attendance, many=True)
            return Response({"success":True,"message":serializer.data},status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AdminGetAttendanceDatesAPIView(APIView):
    """
    API view to get all unique attendance dates.
    """
    def get(self, request):
        try:
            dates = Attendence.objects.values('date').distinct()
            return Response(dates)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AdminGetAttendanceStudentAPIView(APIView):
    """
    API view to get attendance records for a particular student.
    """
    def get(self, request, student_id):
        try:
            attendance = Attendence.objects.filter(student_id=student_id)
            serializer = AttendenceSerializer(attendance, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# --------->>>>> Library <<<--------------------

# ============= Library Allment API Views  =============
class AdminViewLibraryAPIView(APIView):
    """
    API view to get all library items.
    """
    def get(self, request):
        try:
            library_items = Library.objects.all()
            serializer = LibrarySerializer(library_items, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AdminUpdateLibraryAPIView(APIView):
    """
    API view to update a library item.
    """
    def patch(self, request, id):
        try:
            library_item = get_object_or_404(Library, id=id)
            serializer = LibrarySerializer(library_item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AdminDeleteLibraryAPIView(APIView):
    """
    API view to delete a library item.
    """
    def delete(self, request, id):
        try:
            library_item = get_object_or_404(Library, id=id)
            library_item.delete()
            return Response({"message": "Library item deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ---------->>>> Student <<<---------------

# =========== Student Allment API Views ===================
class AddStudentAPIView(APIView):
    """
    API view to add a new student.
    """
    def post(self, request):
        try:
           first_name=request.data.get('first_name')
           last_name=request.data.get('last_name')
           email=request.data.get('email')
           phone=request.data.get('phone')
           roll_no=request.data.get('roll_no')
           gender=request.data.get('gender')
           address=request.data.get('address')
           class_id=request.data.get('class_id')
           image=request.FILES.get('image')
           class_id=request.data.get('class_id')
           user=CustomUser.objects.create_user(first_name=first_name,last_name=last_name,email=email,username=email)
           user.set_password("baiju123")
           user.save()
           class_id=ClassModel.objects.get(id=class_id)
           student=Students.objects.create(name=user,phone=phone,roll_no=roll_no,gender=gender,address=address,class_id=class_id,image=image)
        
           return Response({"success": True, "message": "Student added successfully"}, status=status.HTTP_201_CREATED)
           
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AllStudentAPIView(APIView):
    """
    API view to get all students.
    """
    def get(self, request):
        try:
            students = Students.objects.all().order_by('class_id','roll_no')
            serializer = StudentsSerializer(students, many=True)
            return Response({"success": True, "message": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ViewOneStudentAPIView(APIView):
    """
    API view to get a single student by ID.
    """
    def get(self, request, id):
        try:
            student = Students.objects.get(id=id)
            serializer = StudentsSerializer(student)
            return Response({"success": True, "message": serializer.data})
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# =========== Update Student Image API View =============
class UpdateStudentImageAPIView(APIView):
    def post(request,id):
        student=Students.objects.get(id=id)
        image=request.FILES.get('image')
        student.image=image
        student.save()
        return Response({"success":True,"message":"Image updated successfully"},status=200)
        

class EditStudentAPIView(APIView):
    """
    API view to edit a student's data.
    """
    def get(self, request, student_id):
        try:
            student = get_object_or_404(Students, id=student_id)
            serializer = StudentsSerializer(student)
            return Response(serializer.data)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, student_id):
        try:
            first_name = request.data.get('first_name')
            last_name = request.data.get('last_name')
            email = request.data.get('email')
            class_id = request.data.get('class_id')
            gender = request.data.get('gender')
            phone = request.data.get('phone')
            address = request.data.get('address')  # Fixed: previously assigned `phone`
            roll_no = request.data.get('roll_no')

            # Fetch objects safely
            class_obj = get_object_or_404(ClassModel, id=class_id)
            student_obj = get_object_or_404(Students, id=student_id)
            student_user = get_object_or_404(CustomUser, id=student_obj.name.id)

            # Update user details
            student_user.first_name = first_name
            student_user.last_name = last_name
            student_user.email = email
            student_user.save()

            # Update student details
            student_obj.class_id = class_obj
            student_obj.gender = gender
            student_obj.phone = phone
            student_obj.address = address  # Fixed: previously assigned `phone`
            student_obj.roll_no = roll_no
            student_obj.save()

            return Response({"success": True, "message": "Student Data Updated Successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteStudentAPIView(APIView):
    """
    API view to delete a student by ID.
    """
    def delete(self, request, student_id):
        try:
            student = get_object_or_404(Students, id=student_id)
            student.delete()
            return Response({"message": "Student deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ------>>>>>> Email and Username check <<<<---------------

# ============== Email and Username Check API Views ==============
class CheckEmailExistAPIView(APIView):
    """
    API view to check if an email already exists.
    """
    def get(self, request):
        try:
            email = request.query_params.get('email')
            user_exists = CustomUser.objects.filter(email=email).exists()
            return Response({"exists": user_exists}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CheckUsernameExistAPIView(APIView):
    """
    API view to check if a username already exists.
    """
    def get(self, request):
        try:
            username = request.query_params.get('username')
            user_exists = CustomUser.objects.filter(username=username).exists()
            return Response({"exists": user_exists}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ----------->>>>> Fee <<<<<----------------

# ===================== Fee API Views =====================
class AddFeeAPIView(APIView):
    """
    API view to add a new fee.
    """
    def post(self, request):
        try:
            serializer = FeeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AllFeeAPIView(APIView):
    """
    API view to get all fees.
    """
    def get(self, request):
        try:
            fees = Fee.objects.all()
            serializer = FeeSerializer(fees, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class EditFeeAPIView(APIView):
    """
    API view to edit a fee's data.
    """
    def get(self, request, fee_id):
        try:
            fee = get_object_or_404(Fee, id=fee_id)
            serializer = FeeSerializer(fee)
            return Response(serializer.data)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, fee_id):
        try:
            fee = get_object_or_404(Fee, id=fee_id)
            serializer = FeeSerializer(fee, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteFeeAPIView(APIView):
    """
    API view to delete a fee by ID.
    """
    def delete(self, request, fee_id):
        try:
            fee = get_object_or_404(Fee, id=fee_id)
            fee.delete()
            return Response({"message": "Fee deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ----------->>>>> Bill <<<<<----------------

# ===================== Bill API Views =====================
class AddBillAPIView(APIView):
    """
    API view to add a new bill.
    """
    def post(self, request):
        try:
            serializer = BillSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AllBillAPIView(APIView):
    """
    API view to get all bills.
    """
    def get(self, request):
        try:
            bills = Bill.objects.all()
            serializer = BillSerializer(bills, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class EditBillAPIView(APIView):
    """
    API view to edit a bill's data.
    """
    def get(self, request, bill_id):
        try:
            bill = get_object_or_404(Bill, id=bill_id)
            serializer = BillSerializer(bill)
            return Response(serializer.data)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, bill_id):
        try:
            bill = get_object_or_404(Bill, id=bill_id)
            serializer = BillSerializer(bill, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteBillAPIView(APIView):
    """
    API view to delete a bill by ID.
    """
    def delete(self, request, bill_id):
        try:
            bill = get_object_or_404(Bill, id=bill_id)
            bill.delete()
            return Response({"message": "Bill deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ---------->>>>> Student per Class piechart <<<<<<---------------
class StudentsPerClassAPIView(APIView):
    """
    API view to get the total number of students in each class.
    """
    def get(self, request):
        try:
            class_student_count = (
                Students.objects
                .values('class__name')
                .annotate(studentCount=Count('id'))
                .order_by('class__name')
            )
            data = [{"className": item['class__name'], "studentCount": item['studentCount']} for item in class_student_count]
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)