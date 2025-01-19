from rest_framework.views import APIView
from datetime import datetime
from django.utils.dateparse import parse_date
from rest_framework.response import Response
from rest_framework import status
from attendence.models import Attendence
from subjects.models import Subjects
from students.models import Students
from library.models import Library
from .models import Staffs, LeaveReportStaff
from sacred.serializer import *


#================ Staff Home Page==========
# ===================== Staff Home Page =====================
class StaffHomePage(APIView):
    def get(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)
            total_subjects = staff.teaches_classes.all().count() 
            total_classes = staff.teaches_classes.count()
            total_leaves = LeaveReportStaff.objects.filter(staff=staff).count()
            students_taught = Students.objects.filter(class_id__in=staff.teaches_classes.all()).count()

            return Response({
                "message": f"Welcome {staff.name}",
                "user": staff.name,
                "total_subjects": total_subjects,
                "total_classes": total_classes,
                "total_leaves": total_leaves,
                "total_students": students_taught
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)



# ===================== Get Total students that staff teaches =====================
class StaffTeachesTotalStudent(APIView):
    def get(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)  # Get staff by user name
            classes_taught = staff.teaches_classes.all()  # Get classes taught by staff
            students = Students.objects.filter(class_id__in=classes_taught)  # Get students in those classes
            student_names = [student.name for student in students]  # List of student names
            return Response({"success": True, "total_students": len(student_names), "students": student_names}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)})




# ===================== Get total Subjects that staff teaches =====================
class StaffTeachesTotalSubject(APIView):
    def get(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)
            subjects = Subjects.objects.filter(staff_id=staff)  # Get subjects taught by the staff
            subjects_names = [subject.name for subject in subjects]
            return Response({"success": True, "total_subjects": len(subjects), "subject_names": subjects_names}, status=200)
        except Staffs.DoesNotExist:
            return Response({"success": False, "message": "Staff user not found"}, status=404)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)




# ===================== Add or Update Attendance =====================
class StaffAddAttendanceView(APIView):
    def post(self, request):
        try:
            attendance_data = request.data.get('attendance', [])
            if not attendance_data:
                return Response({"success": False, "message": "No attendance data provided."}, status=status.HTTP_400_BAD_REQUEST)

            # Process each attendance record
            for record in attendance_data:
                student_id = record.get('student_id')
                status_flag = record.get('status', False)
                remarks = record.get('remarks', '')

                try:
                    student = Students.objects.get(id=student_id)
                except Students.DoesNotExist:
                    return Response({"success": False, "message": f"Student with ID {student_id} not found."}, status=status.HTTP_404_NOT_FOUND)

                # Create or update attendance record
                attendance, created = Attendence.objects.update_or_create(
                    student=student,
                    defaults={'status': status_flag, 'remarks': remarks}
                )

            return Response({"success": True, "message": "Attendance updated successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)





# ===================== Get Students Attendance by Date Range =====================
class StaffAttendanceByDateRangeView(APIView):
    def get(self, request):
        start_date_str = request.query_params.get('start_date')
        end_date_str = request.query_params.get('end_date')

        try:
            start_date = parse_date(start_date_str)
            end_date = parse_date(end_date_str)
        except ValueError:
            return Response({"success": False, "message": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        if start_date > end_date:
            return Response({"success": False, "message": "Start date cannot be greater than end date."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            attendance_records = Attendence.objects.filter(
                attendence_date__gte=start_date, attendence_date__lte=end_date
            ).order_by('attendence_date')

            if not attendance_records.exists():
                return Response({"success": False, "message": "No attendance records found."}, status=status.HTTP_404_NOT_FOUND)

            attendance_data = [
                {'student': record.student.name, 'attendance_date': record.attendence_date, 'status': record.status, 'remarks': record.remarks}
                for record in attendance_records
            ]

            return Response({"success": True, "attendance_records": attendance_data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# ===================== Staff Apply and Delete  Leave =====================
class StaffApplyLeaveView(APIView):
    def post(self, request):
        try:
            user = request.user
            message = request.data.get('message')
            staff = Staffs.objects.get(name=user)
            leave_report = LeaveReportStaff.objects.create(staff=staff, message=message)
            return Response({"success": True, "message": "Leave applied successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"success": False, "message": str(e)},status=400)
    
    
    def delete(self,request,id):
        try:
            leave_report=LeaveReportStaff.objects.get(id=id)
            leave_report.delete()
            return Response({"success":True,"message":"Delete Success LeaveReport"},status=200)
        except Exception as e:
            return Response({"success":False,"message":str(e)},status=400)
        




# ===================== Get Staff Profile =====================
class StaffProfileView(APIView):
    def get(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)
            serializer = StaffsSerializer(staff, many=True)
            return Response({"profile": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)},status=400)




# ===================== Update Staff Profile =====================
class StaffProfileUpdateView(APIView):
    def post(self, request):
        try:
            # Get the currently logged-in user
            user = request.user
            staff = Staffs.objects.get(name=user)
        except Staffs.DoesNotExist:
            return Response({"success": False, "message": "Staff not found."}, status=status.HTTP_404_NOT_FOUND)

        # Update fields for the staff profile
        staff.address = request.data.get('address', staff.address)
        staff.contact_number = request.data.get('contact_number', staff.contact_number)
        staff.profile_picture = request.data.get('profile_picture', staff.profile_picture)

        # If 'class_teacher' is provided in the request, update the field
        if 'class_teacher' in request.data:
            staff.class_teacher = request.data.get('class_teacher')

        # If 'teaches_classes' is provided, update the Many-to-Many relationship
        if 'teaches_classes' in request.data:
            class_names = request.data.get('teaches_classes', [])  # List of class names like ["one", "two"]
            class_instances = []

            for class_name in class_names:
                try:
                    # Fetch the ClassModel instance by the name (string)
                    class_instance = ClassModel.objects.get(name=class_name)
                    class_instances.append(class_instance)
                except ClassModel.DoesNotExist:
                    # If any class name is invalid, return an error
                    return Response(
                        {"success": False, "message": f"Class '{class_name}' not found."},
                        status=status.HTTP_404_NOT_FOUND
                    )

            # Update the 'teaches_classes' relationship with the new class instances
            staff.teaches_classes.set(class_instances)

        # Save the updated staff instance
        staff.save()
        return Response({"success": True, "message": "Profile updated successfully"}, status=status.HTTP_200_OK)



# ===================== Add or Delete Exam Notice =====================
class StaffAddExamNotice(APIView):
    def post(self, request):
        try:
            class_id = request.data.get('class_id')
            image = request.data.get('image')

            class_instance = ClassModel.objects.get(id=class_id)

            exam = Exam.objects.create(class_id=class_instance, image=image)
            return Response({"success": True, "message": "Exam added successfully.", "exam_id": exam.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            exam_id = request.query_params.get('exam_id')
            exam = Exam.objects.get(id=exam_id)
            exam.delete()
            return Response({"success": True, "message": "Exam notice deleted successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ===================== Add or Delete Exam Result =====================
class StaffAddExamResultView(APIView):
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

            exam_result = ExamResult.objects.update_or_create(
                exam_id=exam,
                student_id=student,
                subject=subject,
                defaults={'marks_obtained': marks_obtained, 'image': image}
            )

            return Response({"success": True, "message": "Exam result added successfully."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            exam_id = request.query_params.get('exam_id')
            student_id = request.query_params.get('student_id')
            subject_id = request.query_params.get('subject_id')

            exam_result = ExamResult.objects.get(exam_id=exam_id, student_id=student_id, subject_id=subject_id)
            exam_result.delete()

            return Response({"success": True, "message": "Exam result deleted successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ===================== View Library =====================
class StaffViewLibraryView(APIView):
    def get(self, request):
        books = Library.objects.all()
        serializer = LibrarySerializer(books, many=True)
        return Response({"success": True, "message": serializer.data},status=200)


# ===================== Add and Delete Library Item =====================
class StaffAddLibraryView(APIView):
    def post(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)
            title = request.data.get('title')
            pdf_file = request.data.file('file')  # Handle file upload
            library = Library.objects.update_or_create(title=title, pdf_file=pdf_file, uploaded_by=staff)
            serializer = LibrarySerializer(library, many=True)
            return Response({"success": True, "message": "Create or Update Library Data Success", "data": serializer.data}, status=201)
        except Exception as e:
            return Response({"success": False, "message": str(e)},status=400)

    def delete(self, request, id):
        try:
            library = Library.objects.get(id=id)
            library.delete()
            return Response({"success": True, "message": "Delete File Success"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)},status=400)




# ==================== Staff Notice ====================
class StaffNoticeView(APIView):
    def get(self, request):
        try:
            # Filter notices for staff or both (staff and student)
            notices = Notice.objects.filter(audience__in=['staff', 'both'], is_active=True).order_by('-published_date')
            
            if notices.exists():
                serializer = NoticeSerializer(notices, many=True)
                return Response({"success": True, "notices": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"success": False, "message": "No active notices for staff."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)