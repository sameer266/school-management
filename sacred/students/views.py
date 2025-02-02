from datetime import datetime
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView

from sacred.serializer import *
from notice.models import Notice
from exams.models import ExamResult, Exam
from library.models import Library
from classes.models import ClassModel
from attendence.models import Attendence
from students.models import Students, LeaveReportStudent
from accounts.models import Bill


from  rest_framework.authentication import BasicAuthentication,SessionAuthentication
from rest_framework.permissions import IsAuthenticated


# ==== Student Home Page =========
class StudentHomePage(APIView):
    authentication_classes = [BasicAuthentication,SessionAuthentication]
    permission_classes=[IsAuthenticated]
    
    def get(self, request):
        """
        Retrieve student profile, total attendance, and total leaves.
        """
        try:
            user = request.user
            student = Students.objects.get(name=user)
            total_absence = Attendence.objects.filter(student=student, status=False).count()
            total_attendance = Attendence.objects.filter(student=student).count()
            total_leaves = LeaveReportStudent.objects.filter(student=student).count()
            serializer = StudentsSerializer(student)
            return Response({
                "success": True,
                "message": serializer.data,
                "total_attendance": total_attendance,
                "total_leaves": total_leaves,
                "total_absence": total_absence
            }, status=200)
        except Students.DoesNotExist:
            return Response({"success": False, "message": "Student profile not found."}, status=400)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)

# ======== To fetch student attendance and display data by date ========
class StudentAttendance(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes=[IsAuthenticated]
    
    
    def get(self, request):
        """
        Retrieve all attendance records for the logged-in student.
        """
        user = request.user
        print("User",user)
        try:
            student = Students.objects.get(name=user)
            attendance = Attendence.objects.filter(student=student)
            serializer = AttendenceSerializer(attendance, many=True)
            return Response({"success": True, "data": serializer.data}, status=200)
        except Students.DoesNotExist:
            return Response({"success": False, "message": "Student profile not found."}, status=404)

    
    def post(self, request):
        """
        Retrieve attendance records for the logged-in student on a specific date.
        """
        user = request.user
        date = request.data.get('date')
        try:
            date_obj = datetime.strptime(date, "%Y-%m-%d").date()
        except (ValueError, TypeError):
            return Response({"success": False, "message": "Invalid date format. Use YYYY-MM-DD."}, status=400)

        try:
            student = Students.objects.get(name=user)
            attendance_records = Attendence.objects.filter(student=student, attendence_date=date_obj)
            serializer = AttendenceSerializer(attendance_records, many=True)
            return Response({"success": True, "data": serializer.data}, status=200)
        except Students.DoesNotExist:
            return Response({"success": False, "message": "Student profile not found."}, status=404)


# ======== To fetch student leave report ========
class StudentLeaveReport(APIView):
    
    def get(self,request):
        user=request.user
        try:
            student=Students.objects.get(name=user)
            leave_report=LeaveReportStudent.objects.filter(student=student).order_by('-updated_at')
            serializer=LeaveReportStudentSerializer(leave_report,many=True)
            return Response({"success":True,"data":serializer.data},status=200)
        except Exception as e:
            return Response({"success":False,"message":str(e)},status=400)

# ======== Apply for Leave ========
class StudentApplyLeave(APIView):
    def post(self, request):
        """
        Submit a leave application for the logged-in student.
        """
        user = request.user
        leave_message = request.data.get('leave_message')
        start_date=request.data.get('leave_start_date')
        end_date=request.data.get('leave_end_date')
        
        leave_start_date=datetime.strptime(start_date,'%Y-%m-%d').date()
        leave_end_date=datetime.strptime(end_date,'%Y-%m-%d').date()

        try:
            student = Students.objects.get(name=user)
            
            leave_application = LeaveReportStudent.objects.create(student=student,leave_start_date=leave_start_date,leave_end_date=leave_end_date, leave_message=leave_message)
            serializer = LeaveReportStudentSerializer(leave_application)
            return Response({"success": True, "data": serializer.data, "message": "Leave application submitted."}, status=201)
        except Students.DoesNotExist:
            return Response({"success": False, "message": "Student profile not found."}, status=404)

# ======== Get and Update Student Profile ========
class StudentProfile(APIView):
    def get(self, request):
        """
        Retrieve the profile of the logged-in student.
        """
        user = request.user
        try:
            student = Students.objects.get(name=user)
            serializer = StudentsSerializer(student)
            return Response({"success": True, "data": serializer.data}, status=200)
        except Students.DoesNotExist:
            return Response({"success": False, "message": "Student profile not found."}, status=404)

    def post(self, request):
        """
        Update the profile of the logged-in student.
        """
        user = request.user
        try:
            student = Students.objects.get(name=user)
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
        except Students.DoesNotExist:
            return Response({"success": False, "message": "Student profile not found."}, status=404)

# ======== Get Exam Results ========
class ResultView(APIView):
    def get(self, request):
        """
        Retrieve exam results for the logged-in student.
        """
        user = request.user
        exam_id = request.data.get('exam_id')
        class_id = request.data.get('class_id')

        try:
            student = Students.objects.get(name=user)
            exam = Exam.objects.get(id=exam_id, class_id=class_id)
            exam_result = ExamResult.objects.filter(exam=exam, student=student)
            serializer = ExamResultSerializer(exam_result, many=True)
            return Response({"success": True, "data": serializer.data}, status=200)
        except Students.DoesNotExist:
            return Response({"success": False, "message": "Student profile not found."}, status=404)
        except Exam.DoesNotExist:
            return Response({"success": False, "message": "Exam not found."}, status=404)

# ======== Students Library ========
class StudentLibrary(APIView):
    def get(self, request):
        """
        Retrieve all library records.
        """
        library = Library.objects.all()
        serializer = LibrarySerializer(library, many=True)
        return Response({"success": True, "data": serializer.data}, status=200)

# ======== Students Notice ========
class StudentNotice(APIView):
    def get(self, request):
        """
        Retrieve all active notices for the logged-in user type.
        """
        user_type = request.user.user_type
        notices = Notice.objects.filter(Q(audience='both') | Q(audience=user_type), is_active=True)
        serializer = NoticeSerializer(notices, many=True)
        return Response({"success": True, "data": serializer.data}, status=200)

# ======== Students Bill ========
class StudentBill(APIView):
    def get(self, request):
        """
        Retrieve all bills for the logged-in student.
        """
        user = request.user
        try:
            student = Students.objects.get(name=user)
            bills = Bill.objects.filter(student=student).order_by('due_date')
            serializer = BillSerializer(bills, many=True)
            return Response({"success": True, "data": serializer.data}, status=200)
        except Students.DoesNotExist:
            return Response({"success": False, "message": "Student profile not found."}, status=404)

# ======== Students Homework ========
class StudentHomework(APIView):
   
    def get(self, request):
        """
        Retrieve all homework for the class of the logged-in student.
        """
        user = request.user
        print(user)
        try:
            student = Students.objects.get(name=user)
            homework = Homework.objects.filter(class_id=student.class_id)
            data=[]
            
            for hw in homework:
                homework_submit = HomeworkSubmission.objects.filter(student=student, homework=hw).first()
                isSubmitted = homework_submit.status if homework_submit else False
               
                serializer_data=HomeworkSerializer(hw).data
                serializer_data['isSubmitted']=isSubmitted
                data.append(serializer_data)
                

            return Response({"success": True, "message": data}, status=200)
        except Students.DoesNotExist:
            return Response({"success": False, "message": "Student profile not found."}, status=404)

    def post(self, request,id):
        """
        Submit homework for the logged-in student.
        """
        user = request.user
        try:
            print("ID is" + id)
            print(request.FILES)
            student = Students.objects.get(name=user)
            homework_id = id
            submission_file = request.FILES.get('submission_file')

            try:
                homework = Homework.objects.get(id=homework_id, class_id=student.class_id)
                submission = HomeworkSubmission.objects.create(
                    student=student,
                    homework=homework,
                    image=submission_file,
                    status=True
                )
                serializer = HomeworkSubmissionSerializer(submission)
                return Response({"success": True, "data": serializer.data, "message": "Homework submitted successfully."}, status=201)
            except Homework.DoesNotExist:
                return Response({"success": False, "message": "Homework not found."}, status=404)
        except Students.DoesNotExist:
            return Response({"success": False, "message": "Student profile not found."}, status=404)


class StudentHomeworkSubmit(APIView):
    
    def post(self, request,id):
        """
        Submit homework for the logged-in student.
        """
        user = request.user
        try:
            print("ID is" + id)
            print(request.FILES)
            student = Students.objects.get(name=user)
            homework_id = id
            submission_file = request.FILES.get('submission_file')

            try:
                homework = Homework.objects.get(id=homework_id, class_id=student.class_id)
                submission = HomeworkSubmission.objects.create(
                    student=student,
                    homework=homework,
                    image=submission_file,
                    status=True
                )
                serializer = HomeworkSubmissionSerializer(submission)
                return Response({"success": True, "data": serializer.data, "message": "Homework submitted successfully."}, status=201)
            except Homework.DoesNotExist:
                return Response({"success": False, "message": "Homework not found."}, status=404)
        except Students.DoesNotExist:
            return Response({"success": False, "message": "Student profile not found."}, status=404)

