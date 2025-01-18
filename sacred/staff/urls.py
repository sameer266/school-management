from django.urls import path
from . import views

urlpatterns = [
    path('', views.StaffHomePage.as_view()),

    # Attendance routes
    path('staff_take_attendance/', views.StaffAddAttendanceView.as_view()),
    path('staff_update_attendance/', views.StaffAddAttendanceView.as_view()),  # Same view for adding/updating attendance
    path('get_attendance_search/', views.StaffAttendanceByDateRangeView.as_view()),
    path('staff_apply_leave/', views.StaffApplyLeaveView.as_view()),
    path('staff_profile/', views.StaffProfileView.as_view()),
    path('staff_profile_update/', views.StaffProfileUpdateView.as_view()),

    # Exam Routes
    path('staff_add_exam_notice/', views.StaffAddExamNotice.as_view()),
    path('staff_delete_exam_notice/', views.StaffAddExamNotice.as_view()),  # New DELETE route for exam notice
    path('staff_add_exam_result/', views.StaffAddExamResultView.as_view()),
    path('staff_delete_exam_result/', views.StaffAddExamResultView.as_view()),  # New DELETE route for exam result

    # Library Routes
    path('staff_view_library/', views.StaffViewLibraryView.as_view()),
    path('staff_update_library/', views.StaffUpdateLibraryView.as_view()),
    path('staff_delete_library/', views.StaffDeleteLibraryView.as_view()),

    # Staff Information Routes
    path('staff_teaches_total_students/', views.StaffTeachesTotalStudent.as_view()),
    path('staff_teaches_total_subjects/', views.StaffTeachesTotalSubject.as_view()),
]
