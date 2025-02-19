from django.urls import path
from . import views

urlpatterns = [
    # Home page route for staff
    path('', views.StaffHomePage.as_view()),

    # ===================== Attendance Routes ===================== 
    
    # Route to Get all Stundents name 
    path('staff_Total_StudentsName/',views.StaffTotalStudentsName.as_view()),
    
    #Route to Get students name based on seelcted class
    path('staff_ClassBased_StudentsName/<id>/',views.StaffSelectedClassStudents.as_view()),
    
    #Route to Get One students Attendance record
    path('staff_GetOne_Student_Attendance/',views.StaffGetOneStudentAttendance.as_view()),
    
    # Route to take attendance for staff
    path('staff_take_attendance/', views.StaffAddAttendanceView.as_view()),

    # Route to update attendance for staff (using the same view as 'staff_take_attendance')
    path('staff_update_attendance/', views.StaffAddAttendanceView.as_view()),

    # Route to search for attendance by a specific date range
    path('get_attendance_search/', views.StaffAttendanceByDateRangeView.as_view()),
    
    #route to get all attendance of students ============
    path('get_all_students_attendance/<id>/',views.StaffAllStudentsAttendance.as_view()),



    # ===================== Leave Routes ===================== 
    # Route for staff to apply for leave
    path('staff_get_all_leave_requests/',views.StaffApplyLeaveView.as_view()),
    path('staff_apply_leave/', views.StaffApplyLeaveView.as_view()),
    path('staff_delete_leave/<int:id>/',views.StaffApplyLeaveView.as_view()),



    # ===================== Staff Profile Routes ===================== 
    # Route to view the staff profile
    path('staff_profile/', views.StaffProfileView.as_view()),

    #

    # ===================== Exam Routes ===================== 
    
    #route to get all exams  routine data
    path('staff_get_examnotice/',views.StaffAddExamNotice.as_view()),
    
    # Route to add an exam notice
    path('staff_add_exam_notice/', views.StaffAddExamNotice.as_view()),

    # Route to delete an exam notice
    path('staff_delete_exam_notice/<id>/', views.StaffAddExamNotice.as_view()),  # Same view as 'staff_add_exam_notice' for DELETE request



    # ================= Exam REsults =================
    # Route to add exam results
    path('staff_add_exam_result/', views.StaffAddExamResultView.as_view()),

    # Route to delete exam results
    path('staff_delete_exam_result/<int:id>/', views.StaffAddExamResultView.as_view()),  # Same view as 'staff_add_exam_result' for DELETE request


    #======================= HomeWork ===========================
    #Rooute to add HomeWork
    path('staff_add_homework/',views.StaffAddHomework.as_view()),
    
    #route to delete Homework 
    path('staff_delete_homework/<id>/',views.StaffAddHomework.as_view()),

    #route to list  homework 
    path('staff_list_homework/',views.StaffHomeworkList.as_view()),
    
    #route to list and Check Submitted Homework by Student
    path('staff_submitted_homeworklist/',views.StaffCheckHomeworkList.as_view()),
    
    #rote to check homework 
    path('staff_check_homework/',views.StaffCheckHomeworkList.as_view()),
    
    
    # ===================== Library Routes ===================== 
    # Route to view the library information
    path('staff_view_library/', views.StaffViewLibraryView.as_view()),
    
    #Route to upload Libraray books
    path('staff_add_library/',views.StaffAddLibraryView.as_view()),

    # Route to update the library (add/update details)
    path('staff_update_library/<int:id>/', views.StaffAddLibraryView.as_view()),

    # Route to delete a specific library item based on its ID
    path('staff_delete_library/<int:id>/', views.StaffAddLibraryView.as_view()),
    
    



    # ===================== Staff Information Routes ===================== 
    # Route to view the total number of students taught by a staff member
    path('staff_teaches_total_students/', views.StaffTeachesTotalStudent.as_view()),

    # Route to view the total number of subjects taught by a staff member
    path('staff_teaches_total_subjects/', views.StaffTeachesTotalSubject.as_view()),


    # ======================= Staff Notice =========
     path('staff_notices/', views.StaffNoticeView.as_view()),
]

