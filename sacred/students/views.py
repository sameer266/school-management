from datetime import datetime
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from sacred.serializer import *
from notice.models import Notice
from exams.models import ExamResult, Exam
from library.models import Library
from classes.models import ClassModel
from attendence.models import Attendence
from students.models import Students, LeaveReportStudent
from accounts.models import Bill
from homeworks.models import Homework, HomeworkSubmission

# ==== Helper function to fetch student by user name =====
def get_student_by_user(user):
    try:
        return Students.objects.get(name=user)
    except Students.DoesNotExist:
        return None




# ==== Student Home Page =========
class StudentHomePage(APIView):
    def get(self, request):
        user = request.user
        student = get_student_by_user(user)
        if student:
            serializer = StudentsSerializer(student)
            return Response({"success": True, "message": serializer.data}, status=200)
        return Response({"success": False, "message": "Student profile not found."}, status=404)



# ======== To fetch student attendance and display data by date ========
class StudentAttendance(APIView):
    def get(self, request):
        user = request.user
        student = get_student_by_user(user)
        if student:
            attendance = Attendence.objects.filter(student=student)
            serializer = AttendenceSerializer(attendance, many=True)
            return Response({"success": True, "data": serializer.data}, status=200)
        return Response({"success": False, "message": "Student profile not found."}, status=404)

    def post(self, request):
        user = request.user
        date = request.data.get('date')
        
        try:
            date_obj = datetime.strptime(date, "%Y-%m-%d").date()
        except (ValueError, TypeError):
            return Response({"success": False, "message": "Invalid date format. Use YYYY-MM-DD."}, status=400)

        student = get_student_by_user(user)
        if student:
            attendance_records = Attendence.objects.filter(student=student, attendence_date=date_obj)
            serializer = AttendenceSerializer(attendance_records, many=True)
            return Response({"success": True, "data": serializer.data}, status=200)
        return Response({"success": False, "message": "Student profile not found."}, status=404)




# ======== Apply for Leave ========
class StudentApplyLeave(APIView):
    def post(self, request):
        user = request.user
        message = request.data.get('message')

        if not message:
            return Response({"success": False, "message": "Message is required."}, status=400)

        student = get_student_by_user(user)
        if student:
            leave_application = LeaveReportStudent.objects.create(name=student, message=message)
            serializer = LeaveReportStudentSerializer(leave_application)
            return Response({"success": True, "data": serializer.data, "message": "Leave application submitted."}, status=201)
        return Response({"success": False, "message": "Student profile not found."}, status=404)



# ======== Get and Update Student Profile ========
class StudentProfile(APIView):
    def get(self, request):
        user = request.user
        student = get_student_by_user(user)
        if student:
            serializer = StudentsSerializer(student)
            return Response({"success": True, "data": serializer.data}, status=200)
        return Response({"success": False, "message": "Student profile not found."}, status=404)

    def post(self, request):
        user = request.user
        student = get_student_by_user(user)
        if student:
            student.gender = request.data.get('gender', student.gender)
            student.profile_picture = request.FILES.get('profile_picture', student.profile_picture)
            student.address = request.data.get('address', student.address)
            
            class_name = request.data.get('class_id')
            if class_name:
                try:
                    student.class_id = ClassModel.objects.get(name=class_name)
                except ClassModel.DoesNotExist:
                    return Response({"success": False, "message": "Class not found."}, status=404)
            
            student.contact_number = request.data.get('contact_number', student.contact_number)
            student.save()

            serializer = StudentsSerializer(student)
            return Response({"success": True, "message": "Profile updated successfully.", "data": serializer.data}, status=200)
        return Response({"success": False, "message": "Student profile not found."}, status=404)



# ======== Get Exam Results ========
class ResultView(APIView):
    def get(self, request):
        user = request.user
        exam_id = request.data.get('exam_id')
        class_id = request.data.get('class_id')

        student = get_student_by_user(user)
        if student:
            try:
                exam = Exam.objects.get(id=exam_id, class_id=class_id)
                exam_result = ExamResult.objects.filter(exam=exam, student=student)
                serializer = ExamResultSerializer(exam_result, many=True)
                return Response({"success": True, "data": serializer.data}, status=200)
            except Exam.DoesNotExist:
                return Response({"success": False, "message": "Exam not found."}, status=404)
        return Response({"success": False, "message": "Student profile not found."}, status=404)




# ======== Students Library ========
class StudentLibrary(APIView):
    def get(self, request):
        library = Library.objects.all()
        serializer = LibrarySerializer(library, many=True)
        return Response({"success": True, "data": serializer.data}, status=200)




# ======== Students Notice ========
class StudentNotice(APIView):
    def get(self, request):
        user_type = request.user.user_type
        notices = Notice.objects.filter(Q(audience='both') | Q(audience=user_type), is_active=True)
        serializer = NoticeSerializer(notices, many=True)
        return Response({"success": True, "data": serializer.data}, status=200)




# ======== Students Bill ========
class StudentBill(APIView):
    def get(self, request):
        user = request.user
        student = get_student_by_user(user)
        if student:
            bills = Bill.objects.filter(student=student).order_by('date_due')
            serializer = BillSerializer(bills, many=True)
            return Response({"success": True, "data": serializer.data}, status=200)
        return Response({"success": False, "message": "Student profile not found."}, status=404)




# ======== Students Homework ========
class StudentHomework(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        user = request.user
        student = get_student_by_user(user)
        if student:
            homework = Homework.objects.filter(class_id=student.class_id)
            serializer = HomeworkSerializer(homework, many=True)
            return Response({"success": True, "data": serializer.data}, status=200)
        return Response({"success": False, "message": "Student profile not found."}, status=404)

    def post(self, request):
        user = request.user
        student = get_student_by_user(user)
        if student:
            homework_id = request.data.get('homework_id')
            submission_file = request.FILES.get('submission_file')

            if not homework_id or not submission_file:
                return Response({"success": False, "message": "Homework ID and submission file are required."}, status=400)

            try:
                homework = Homework.objects.get(id=homework_id, class_id=student.class_id)
                submission = HomeworkSubmission.objects.create(
                    student=student,
                    homework=homework,
                    submission_file=submission_file,
                    status='submitted'
                )
                serializer = HomeworkSubmissionSerializer(submission)
                return Response({"success": True, "data": serializer.data, "message": "Homework submitted successfully."}, status=201)
            except Homework.DoesNotExist:
                return Response({"success": False, "message": "Homework not found."}, status=404)
        return Response({"success": False, "message": "Student profile not found."}, status=404)
