from rest_framework.views import APIView
from datetime import datetime
from django.utils.dateparse import parse_date

from rest_framework.response import Response
from rest_framework import status
from attendence.models import Attendence
from subjects.models import Subjects
from students.models import Students
from library.models import Library
from .models import Staffs,LeaveReportStaff
from sacred.serializer import *




class StaffHomePage(APIView):
    def get(self, request):
        return Response({"message": "Welcome to the API"}, status=status.HTTP_200_OK)


# ========= Get Total students that staff teaches ===========
class StaffTeachesTotalStudent(APIView):
    def get(self, request):
        try:
            user=request.user
            staff=Staffs.objects.get(name=user)
            classes_taught=staff.teaches_classes.all()
            students=Students.objects.filter(class_id__in=classes_taught)
            student_names=[student.name for student in students]
            return Response({"success":True,"total_students":len(student_names),"students":student_names}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success":False,"message":str(e)})
    
    
# =========== Get total Subjecs that staff teaches ===========
class StaffTeachesTotalSubject(APIView):
    def get(self, request):
        try:
            user=request.user
            staff=Staffs.objects.get(name=user)
            subjects=Subjects.objects.filter(staff_id=staff)
            subjects_names=[i.name for i in subjects ]
            return Response({"success":True,"total_subjects":len(subjects),"subject_names":subjects_names},status=200)
        except Staffs.DoesNotExist:
            return Response({"success":True,"message":"Staff user not found"},status=404)
        except Exception as e:
            return Response({"success":False,"message":str(e)},status=400)
        

# ==== To add Attendence and Update attendence if existing record found ===
class StaffAddAttendanceView(APIView):
    def post(self, request):
        try:
            # Get attendance data from the request
            attendance_data = request.data.get('attendance', [])
    
            if not attendance_data:
                return Response(
                    {"success": False, "message": "No attendance data provided."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Process each attendance record
            for record in attendance_data:
                student_id = record.get('student_id')
                status_flag = record.get('status', False)
                remarks = record.get('remarks', '')

                # Fetch the student
                try:
                    student = Students.objects.get(id=student_id)
                except Students.DoesNotExist:
                    return Response(
                        {"success": False, "message": f"Student with ID {student_id} not found."},
                        status=status.HTTP_404_NOT_FOUND
                    )

                # Create or update attendance record
                attendance, created = Attendence.objects.update_or_create(
                    student=student,
                    defaults={
                        'status': status_flag,
                        'remarks': remarks,
                    }
                )

            return Response(
                {"success": True, "message": "Attendance updated successfully."},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {"success": False, "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


# ========= To get Students Attendence by date range search ======
class StaffAttendanceByDateRangeView(APIView):
    def get(self, request):
        # Get the date range parameters from the request
        start_date_str = request.query_params.get('start_date')
        end_date_str = request.query_params.get('end_date')


        # Convert the string dates to date objects
        try:
            start_date = parse_date(start_date_str)
            end_date = parse_date(end_date_str)
        except ValueError:
            return Response(
                {"success": False, "message": "Invalid date format. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if start_date > end_date:
            return Response(
                {"success": False, "message": "Start date cannot be greater than end date."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Filter the attendance records within the date range
        try:
            attendance_records = Attendence.objects.filter(
                attendence_date__gte=start_date, attendence_date__lte=end_date
            ).order_by('attendence_date')

            # If no records are found
            if not attendance_records.exists():
                return Response(
                    {"success": False, "message": "No attendance records found in the given date range."},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Serialize the attendance records (assuming you have an appropriate serializer)
            # If no serializer, you can just return the queryset as raw data
            attendance_data = [
                {
                    'student': record.student.name,
                    'attendance_date': record.attendence_date,
                    'status': record.status,
                    'remarks': record.remarks,
                }
                for record in attendance_records
            ]

            return Response(
                {"success": True, "attendance_records": attendance_data},
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            return Response(
                {"success": False, "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
            
            

# ======== Satff Apply leave ==========
class StaffApplyLeaveView(APIView):
    def post(self, request):
        try:
            user=request.user
            message=request.data.get('message')            
            staff=Staffs.objects.get(name=user)
            leave_report=LeaveReportStaff.objects.create(staff=staff,message=message)
            return Response({"success":True,"message": "Leave applied successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"success":True,"message":str(e)})



# ========= get Staff Profile ===========
class StaffProfileView(APIView):
    def get(self, request):
        try:
            user=request.user
            staff=Staffs.objects.get(name=user)
            serializer=StaffsSerializer(staff,many=True)
            return Response({"profile": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success":True,"message":str(e)})


# ======== Update staff Profile =========
class StaffProfileUpdateView(APIView):
    
    def post(self, request):
        try:
            user=request.user
            staff=Staffs.objects.get(name=user)
        except Staffs.DoesNotExist:
            return Response({"success": False, "message": "Staff not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Update fields in the staff profile
        staff.address = request.data.get('address', staff.address)
        staff.contact_number = request.data.get('contact_number', staff.contact_number)
        staff.profile_picture = request.data.get('profile_picture', staff.profile_picture)

        # Optionally update the `class_teacher` and `teaches_classes` fields, if provided
        if 'class_teacher' in request.data:
            staff.class_teacher = request.data.get('class_teacher')
        if 'teaches_classes' in request.data:
            staff.teaches_classes.set(request.data.get('teaches_classes'))

        # Save the updated staff instance
        staff.save()
        return Response({"success": True, "message": "Profile updated successfully"}, status=status.HTTP_200_OK)





# ======== Add Staff Exam  Notice=======
class StaffAddExamNotice(APIView):
    
    # add exam Notice
    def post(self, request):
        try:
            # Get data from request
            class_id = request.data.get('class_id')
            image = request.data.get('image')
        
            class_instance = ClassModel.objects.get(id=class_id)
        
            # Create a new exam
            exam = Exam.objects.create(
                class_id=class_instance,
                image=image
            )
            return Response(
                {"success": True, "message": "Exam added successfully.", "exam_id": exam.id},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"success": False, "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    # Delete Exam  notice
    def delete(self, request):
        try:
            exam_id = request.query_params.get('exam_id')

            exam = Exam.objects.get(id=exam_id)
            # Delete the exam
            exam.delete()
            return Response(
                {"success": True, "message": "Exam notice deleted successfully."},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"success": False, "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


# ======== Staff Add Exam Result ========
class StaffAddExamResultView(APIView):
    
    # Add the result 
    def post(self, request):
        try:
            exam_id = request.data.get('exam_id')
            student_id = request.data.get('student_id')
            subject_id = request.data.get('subject_id')
            marks_obtained = request.data.get('marks_obtained')
            image = request.data.get('image', '')  # Optional

            exam = Exam.objects.get(id=exam_id)
           
            student = Students.objects.get(id=student_id)

            subject = Subjects.objects.get(id=subject_id)
         
            # Create or update the exam result
            exam_result = ExamResult.objects.update_or_create(
                exam_id=exam,
                student_id=student,
                subject=subject,
                defaults={
                    'marks_obtained': marks_obtained,
                    'image': image
                }
            )
            return Response(
                {"success": True, "message": "Exam result added successfully."},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"success": False, "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    # Delete The Result 
    def delete(self, request):
        try:
            exam_id = request.query_params.get('exam_id')
            student_id = request.query_params.get('student_id')
            subject_id = request.query_params.get('subject_id')

            exam_result = ExamResult.objects.get(
                    exam_id=exam_id,
                    student_id=student_id,
                    subject_id=subject_id
                )
           
            # Delete the exam result
            exam_result.delete()

            return Response(
                {"success": True, "message": "Exam result deleted successfully."},
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            return Response(
                {"success": False, "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
            
            


# ========== Get All Library ===========
class StaffViewLibraryView(APIView):
    def get(self, request):
        books = Library.objects.all()
        serializer=LibrarySerializer(books,many=True)
        return Response({"success":True,"message":serializer.data})
       


class StaffUpdateLibraryView(APIView):
    def post(self, request):
        # Update library logic here
        return Response({"message": "Library updated successfully"}, status=status.HTTP_200_OK)


class StaffDeleteLibraryView(APIView):
    def delete(self, request):
        book_id = request.query_params.get('book_id')
        book = Library.objects.get(id=book_id)
        book.delete()
        return Response({"message": "Library item deleted successfully"}, status=status.HTTP_200_OK)
