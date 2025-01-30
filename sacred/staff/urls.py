from django.urls import path
from . import views

urlpatterns = [
    # Home page route for staff
    path('', views.StaffHomePage.as_view()),

    # ===================== Attendance Routes ===================== 
    # Route to take attendance for staff
    path('staff_take_attendance/', views.StaffAddAttendanceView.as_view()),

    # Route to update attendance for staff (using the same view as 'staff_take_attendance')
    path('staff_update_attendance/', views.StaffAddAttendanceView.as_view()),

    # Route to search for attendance by a specific date range
    path('get_attendance_search/', views.StaffAttendanceByDateRangeView.as_view()),



    # ===================== Leave Routes ===================== 
    # Route for staff to apply for leave
    path('staff_apply_leave/', views.StaffApplyLeaveView.as_view()),
    path('staff_delete_leave/<int:id>/',views.StaffApplyLeaveView.as_view()),



    # ===================== Staff Profile Routes ===================== 
    # Route to view the staff profile
    path('staff_profile/', views.StaffProfileView.as_view()),

    #

    # ===================== Exam Routes ===================== 
    # Route to add an exam notice
    path('staff_add_exam_notice/', views.StaffAddExamNotice.as_view()),

    # Route to delete an exam notice
    path('staff_delete_exam_notice/<id>/', views.StaffAddExamNotice.as_view()),  # Same view as 'staff_add_exam_notice' for DELETE request

    # Route to add exam results
    path('staff_add_exam_result/', views.StaffAddExamResultView.as_view()),

    # Route to delete exam results
    path('staff_delete_exam_result/<int:id>/', views.StaffAddExamResultView.as_view()),  # Same view as 'staff_add_exam_result' for DELETE request



    # ===================== Library Routes ===================== 
    # Route to view the library information
    path('staff_view_library/', views.StaffViewLibraryView.as_view()),

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
     path('staff/notices/', views.StaffNoticeView.as_view()),
]

