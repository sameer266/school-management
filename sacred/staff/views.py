from rest_framework.views import APIView
from datetime import datetime
from django.utils.dateparse import parse_date
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from attendence.models import Attendence
from subjects.models import Subjects
from students.models import Students
from library.models import Library
from .models import Staffs, LeaveReportStaff
from sacred.serializer import *

# ===================== Staff Home Page =====================
class StaffHomePage(APIView):
    authentication_classes = [BasicAuthentication, SessionAuthentication]

    def get(self, request):
        try:
            user = request.user  # Logged-in user
            print(user)  # Debugging

            # Fetch staff by user, NOT by name
            staff = Staffs.objects.get(name=user)
            serializer = StaffsSerializer(staff)

            total_classes = staff.teaches_classes.count()
            total_leaves = LeaveReportStaff.objects.filter(staff=staff).count()
            students_taught = Students.objects.filter(class_id__in=staff.teaches_classes.all()).distinct().count()

            return Response({
                "success": True,
                "message": f"Welcome {staff.name}",
                "user": serializer.data,
                "total_classes": total_classes,
                "total_leaves": total_leaves,
                "total_students": students_taught
            }, status=status.HTTP_200_OK)

        except Staffs.DoesNotExist:
            return Response({"error": "Staff profile not found"}, status=status.HTTP_404_NOT_FOUND)

# ===================== Get Total Students that Staff Teaches =====================
class StaffTeachesTotalStudent(APIView):
    def get(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)
            classes_taught = staff.teaches_classes.all()
            students = Students.objects.filter(class_id__in=classes_taught)
            student_names = [student.name for student in students]

            return Response({"success": True, "total_students": len(student_names), "students": student_names}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)})

# ===================== Get Total Subjects that Staff Teaches =====================
class StaffTeachesTotalSubject(APIView):
    def get(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)
            subject_name = staff.subject_teaches.subject_name
            return Response({"success": True, "subject_names": subject_name}, status=status.HTTP_201_CREATED)
        except Staffs.DoesNotExist:
            return Response({"success": False, "message": "Staff user not found"}, status=404)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

# ===================== Get Total Students Name =====================
class StaffTotalStudentsName(APIView):
    def get(self, request):
        try:
            user = request.user
            print(user)
            staff = Staffs.objects.get(name=user)
            class_id = staff.class_teacher
            print(class_id)
            students = Students.objects.filter(class_id=class_id)
            students_data = StudentsSerializer(students, many=True).data

            return Response({"success": True, "message": students_data}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
        
# ===================== Get Staff Teaches Classes =====================
class StaffTeachesClasses(APIView):
    def get(self, request):
        try:
            user= request.user
            staff= Staffs.objects.get(name=user)
            classes= staff.teaches_classes.all()
            serializer=ClassModelSerializer(classes,many=True)
            return Response({"success":True,"message":serializer.data},status=200)
        except Exception as e:
            return Response({"success":False,"message":str(e)},status=400)

# ===================== Get Selected Class Students Name =====================
class StaffSelectedClassStudents(APIView):
    def get(self, request, id):
        try:
            class_obj = ClassModel.objects.get(id=id)
            students_obj = Students.objects.filter(class_id=class_obj)
            serializers = StudentsSerializer(students_obj, many=True)
            return Response({"success": True, "students_data": serializers.data}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

# ===================== Add or Update Attendance =====================
class StaffAddAttendanceView(APIView):
    def post(self, request):
        try:
            students_attendance = request.data
            serializer_data = []
            for student in students_attendance:
                student_id = student.get('id')
                student_obj = Students.objects.get(id=student_id)
                status = student.get('status')
                remarks = student.get('remarks', '')
                attendance = Attendence.objects.update_or_create(student=student_obj, status=status, remarks=remarks)
                serializer_data.append(AttendenceSerializer(attendance).data)
            return Response({"success": True, "message": "Attendance Created Successfully", "data": serializer_data}, status=201)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

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

# ===================== Get All Students Attendance =====================
class StaffAllStudentsAttendance(APIView):
    def get(self, request, id):
        try:
            class_obj = ClassModel.objects.get(id=id)
            student_objs = Students.objects.filter(class_id=class_obj)
            attendance_objs = Attendence.objects.filter(student__in=student_objs)
            serializers = AttendenceSerializer(attendance_objs, many=True)
            return Response({"success": True, "students_attendance": serializers.data}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

# ===================== Get One Student Attendance Records =====================
class StaffGetOneStudentAttendance(APIView):
    def get(self, request, id):
        try:
            student = Students.objects.get(id=id)
            attendance = Attendence.objects.filter(student=student)
            serializer = AttendenceSerializer(attendance, many=True)
            return Response({"success": True, "student": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ===================== Staff Apply and Delete Leave =====================
class StaffApplyLeaveView(APIView):
    def get(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)
            leave_requests = LeaveReportStaff.objects.filter(staff=staff)
            serializer = LeaveReportStaffSerializer(leave_requests, many=True)
            return Response({"success": True, "leave_requests": serializer.data}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

    def post(self, request):
        try:
            user = request.user
            message = request.data.get('message')
            start_date = request.data.get('leave_start_date')
            end_date = request.data.get('leave_end_date')

            start_date_parsed = datetime.strptime(start_date, '%Y-%m-%d')
            end_date_parsed = datetime.strptime(end_date, '%Y-%m-%d')

            staff = Staffs.objects.get(name=user)

            LeaveReportStaff.objects.create(
                staff=staff,
                leave_message=message,
                leave_start_date=start_date_parsed,
                leave_end_date=end_date_parsed
            )

            return Response({"success": True, "message": "Leave applied successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

    def delete(self, request, id):
        try:
            leave_report = LeaveReportStaff.objects.get(id=id)
            leave_report.delete()
            return Response({"success": True, "message": "Delete Success LeaveReport"}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

# ===================== Get Staff Profile =====================
class StaffProfileView(APIView):
    def get(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)
            serializer = StaffsSerializer(staff, many=True)
            return Response({"profile": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

# ===================== Update Staff Profile =====================
class StaffProfileUpdateView(APIView):
    def post(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)
        except Staffs.DoesNotExist:
            return Response({"success": False, "message": "Staff not found."}, status=status.HTTP_404_NOT_FOUND)

        staff.address = request.data.get('address', staff.address)
        staff.contact_number = request.data.get('contact_number', staff.contact_number)
        staff.profile_picture = request.data.get('profile_picture', staff.profile_picture)

        if 'class_teacher' in request.data:
            staff.class_teacher = request.data.get('class_teacher')

        if 'teaches_classes' in request.data:
            class_names = request.data.get('teaches_classes', [])
            class_instances = []

            for class_name in class_names:
                try:
                    class_instance = ClassModel.objects.get(name=class_name)
                    class_instances.append(class_instance)
                except ClassModel.DoesNotExist:
                    return Response(
                        {"success": False, "message": f"Class '{class_name}' not found."},
                        status=status.HTTP_404_NOT_FOUND
                    )

            staff.teaches_classes.set(class_instances)

        staff.save()
        return Response({"success": True, "message": "Profile updated successfully"}, status=status.HTTP_200_OK)

# ===================== Add or Delete Exam Notice =====================
class StaffAddExamNotice(APIView):
    def get(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)
            classes = staff.teaches_classes.all()
            exams = Exam.objects.filter(class_id__in=classes)
            serializers = ExamSerializer(exams, many=True)
            return Response({"success": True, "exam_data": serializers.data}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

    def post(self, request):
        try:
            print(request.data)
            class_id = request.data.get('class_id')
            image = request.FILES.get('image')

            class_instance = ClassModel.objects.get(id=class_id)
            exam = Exam.objects.create(class_id=class_instance, image=image)

            return Response({"success": True, "message": "Exam added successfully.", "exam_id": exam.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            exam_id = id
            exam = Exam.objects.get(id=exam_id)
            exam.delete()
            return Response({"success": True, "message": "Exam notice deleted successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)



# ===================== Add or Delete Exam Result =====================
class StaffAddExamResultView(APIView):
    
    def get(self, request,id):
        try:
            class_id=id
            user= request.user
            staff= Staffs.objects.get(name=user)
            staff_subject= staff.subject_teaches
            exam=ExamResult.objects.filter(subject=staff_subject).order_by('-created_at','student__roll_no')
            exam_data=ExamResultSerializer(exam,many=True).data
            
            students=Students.objects.filter(class_id=class_id)
            student_data=StudentsSerializer(students,many=True).data
            
            return Response({"success":True,"exams_data":exam_data,"students_data":student_data},status=200)
            
        except Exception as e:
            return Response({"success":False,"message":str(e)},status=400)
    
    def post(self, request):
        try:
            exam = request.data.get('exam_id')
            student = request.data.get('student_id')
            subject = request.data.get('subject_id')
            marks_obtained = request.data.get('marks_obtained')
            image = request.data.get('image', '')

            exam = Exam.objects.get(id=exam)
            student = Students.objects.get(id=student)
            subject = Subjects.objects.get(id=subject)

            ExamResult.objects.update_or_create(
                exam_id=exam,
                student_id=student,
                subject=subject,
                defaults={'marks_obtained': marks_obtained, 'image': image}
            )

            return Response({"success": True, "message": "Exam result added successfully."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            exam_id = id
            exam_result = ExamResult.objects.get(exam_id=exam_id)
            exam_result.delete()
            return Response({"success": True, "message": "Exam result deleted successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ===================== View Library =====================
class StaffViewLibraryView(APIView):
    def get(self, request):
        books = Library.objects.all()
        serializer = LibrarySerializer(books, many=True)
        return Response({"success": True, "message": serializer.data}, status=200)

# ===================== Add and Delete Library Item =====================
class StaffAddLibraryView(APIView):
    def post(self, request):
        try:
            print(request.data)
            user = request.user
            title = request.data.get('title')
            pdf_file = request.FILES.get('pdf_file')

            Library.objects.create(title=title, pdf_file=pdf_file, uploaded_by=user)
            return Response({"success": True, "message": "Create Library Data Success",}, status=201)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

    def patch(self, request, id):
        try:
            user = request.user
            print(request.data)

            library = Library.objects.get(id=id)

            title = request.data.get('title', library.title)
            pdf_file = request.FILES.get('pdf_file', library.pdf_file)

            library.title = title
            library.pdf_file = pdf_file if pdf_file else library.pdf_file
            library.uploaded_by = user

            library.save()
            return Response({"success": True, "message": "Library updated Successfully"})
        except Exception as e:
            return Response({"success": False, "message": str(e)})

    def delete(self, request, id):
        try:
            library = Library.objects.get(id=id)
            library.delete()
            return Response({"success": True, "message": "Delete File Success"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

# ===================== Staff Notice =====================
class StaffNoticeView(APIView):
    def get(self, request):
        try:
            notices = Notice.objects.filter(audience__in=['staff', 'both'], is_active=True).order_by('-published_date')
            print(notices)

            if notices:
                serializer = NoticeSerializer(notices, many=True)
                print(serializer.data)
                return Response({"success": True, "notices": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"success": False, "message": "No active notices for staff."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ===================== Add and Delete Homework =====================
class StaffAddHomework(APIView):
    def post(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)
            subject_name = request.data.get('subject')
            description = request.data.get('description', '')
            image = request.FILES.get('image', None)
            class_id = request.data.get('class_id')
            due_date_str = request.data.get('due_date')

            if due_date_str:
                due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date()
            else:
                return Response({"success": False, "message": "Due date is required"}, status=status.HTTP_400_BAD_REQUEST)

            subject_obj = Subjects.objects.get(subject_name=subject_name)
            class_obj = ClassModel.objects.get(id=class_id)

            Homework.objects.create(
                subject=subject_obj,
                description=description,
                image=image,
                class_id=class_obj,
                due_date=due_date,
                created_by=staff
            )

            return Response({"success": True, "message": "Homework added successfully"}, status=status.HTTP_201_CREATED)
        except Subjects.DoesNotExist:
            return Response({"success": False, "message": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)
        except ClassModel.DoesNotExist:
            return Response({"success": False, "message": "Class not found"}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({"success": False, "message": "Invalid due date format"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            homework = Homework.objects.get(id=id)
            homework.delete()
            return Response({"success": True, "message": "Homework Delete Successfully"}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

# ===================== Staff Homework List =====================
class StaffHomeworkList(APIView):
    def get(self, request):
        try:
            homework = Homework.objects.all().order_by('-created_at')
            serializers = HomeworkSerializer(homework, many=True)
            return Response({"success": True, "homework_list": serializers.data}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

# ===================== Staff Check Submitted Homework =====================
class StaffCheckHomeworkList(APIView):
    def get(self, request):
        try:
            user = request.user
            staff = Staffs.objects.get(name=user)

            hw_list = Homework.objects.filter(created_by=staff)
            hwsubmit = HomeworkSubmission.objects.filter(homework__in=hw_list).order_by('submission_date')

            serializers = HomeworkSubmissionSerializer(hwsubmit, many=True)
            return Response({"success": True, "submitted_hw": serializers.data}, status=200)
        except Staffs.DoesNotExist:
            return Response({"success": False, "message": "Staff not found"}, status=404)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

    def post(self, request):
        try:
            id = request.data.get("id")
            HomeworkSubmission.objects.update(id=id, status=True)
            return Response({"success": True, "message": "Homework Checked Successfully"})
        except Exception as e:
            return Response({"success": False, "message": str(e)})