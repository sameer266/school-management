from django.urls import path
from . import views

urlpatterns = [
    
    # ==== Student Home Page ====
    path('', views.StudentHomePage.as_view(), name='student_homepage'),  # Home page for students
    
    # ==== Student Attendance ====
    path('student_view_attendance/', views.StudentAttendance.as_view(), name='student_view_attendance'),  # View student attendance
    path('student_view_attendance_post/', views.StudentAttendance.as_view(), name='student_view_attendance_post'),  # Get attendance for selected date


    # ==== Student Leave Application ====
    path('student_leave_report/', views.StudentLeaveReport.as_view(), name='syudent_leave_report'),  # View student leave report
    path('student_apply_leave/', views.StudentApplyLeave.as_view(), name='student_apply_leave'),  # Apply for leave

    # ==== Student Profile ====
    path('student_profile/', views.StudentProfile.as_view(), name='student_profile'),  # View student profile
    path('student_profile_update/', views.StudentProfile.as_view(), name='student_profile_update'),  # Update student profile
    
    # ==== Student Exam Results ====
    path('student_view_result/', views.ResultView.as_view(), name='student_view_result'),  # View student exam results

    # ==== Student Library ====
    path('student_view_library/', views.StudentLibrary.as_view(), name='student_view_library'),  # View available library resources
    
    # ==== Student Notices ====
    path('student_notice/', views.StudentNotice.as_view(), name='student_notice'),  # Get active notices
    
    # ==== Student Bills ====
    path('student_bill/', views.StudentBill.as_view(), name='student_bill'),  # View student bills (Notice class used for now)
    
    # ==== Student Homework ====
    path('student_view_homework/', views.StudentHomework.as_view(), name='student_view_homework'),  # View homework assignments
    path('student_submit_homework/<id>/', views.StudentHomeworkSubmit.as_view(), name='student_submit_homework'),  # Submit homework assignments
    
]
