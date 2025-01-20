from django.urls import path
from . import views

urlpatterns = [
    # AdminHOD URLs
    path('', views.AdminHomeAPIView.as_view(), name='admin_home'),
    path('add_staff/', views.AddStaffAPIView.as_view(), name='add_staff'),
    path('view_all_staff/', views.ManageStaffAPIView.as_view(), name='view_all_staff'),
      path('view_one_staff/<id>/',views.ViewOneStaffAPIView.as_view()),
    path('edit_staff/<int:staff_id>/', views.EditStaffAPIView.as_view(), name='edit_staff'),
    path('delete_staff/<int:staff_id>/', views.DeleteStaffAPIView.as_view(), name='delete_staff'),

    # Subject management
    path('add_subject/', views.AddSubjectAPIView.as_view(), name='add_subject'),
    path('view_all_subject/', views.ManageSubjectAPIView.as_view(), name='view_all_subject'),
    path('edit_subject/<int:subject_id>/', views.EditSubjectAPIView.as_view(), name='edit_subject'),
    path('delete_subject/<int:subject_id>/', views.DeleteSubjectAPIView.as_view(), name='delete_subject'),

    # Student management
    path('add_student/', views.AddStudentAPIView.as_view(), name='add_student'),
    path('edit_student/<int:student_id>/', views.EditStudentAPIView.as_view(), name='edit_student'),
    path('view_all_student/', views.ManageStudentAPIView.as_view(), name='view_all_student'),
      path('view_one_student/<id>/',views.ViewOneStudentAPIView.as_view()),
    path('delete_student/<int:student_id>/', views.DeleteStudentAPIView.as_view(), name='delete_student'),

    # Email and Username checks
    path('check_email_exist/', views.CheckEmailExistAPIView.as_view(), name='check_email_exist'),
    path('check_username_exist/', views.CheckUsernameExistAPIView.as_view(), name='check_username_exist'),

    # Library management
    path('admin_view_library/', views.AdminViewLibraryAPIView.as_view(), name='admin_view_library'),
    path('admin_update_library/<int:id>/', views.AdminUpdateLibraryAPIView.as_view(), name='admin_update_library'),
    path('admin_delete_library/<int:id>/', views.AdminDeleteLibraryAPIView.as_view(), name='admin_delete_library'),

    # Leave management for students
    path('student_leave_view/', views.StudentLeaveView.as_view(), name='student_leave_view'),
    path('student_leave_approve/<int:leave_id>/', views.StudentLeaveApproveView.as_view(), name='student_leave_approve'),
    path('student_leave_reject/<int:leave_id>/', views.StudentLeaveRejectView.as_view(), name='student_leave_reject'),

    # Leave management for staff
    path('staff_leave_view/', views.StaffLeaveView.as_view(), name='staff_leave_view'),
    path('staff_leave_approve/<int:leave_id>/', views.StaffLeaveApproveView.as_view(), name='staff_leave_approve'),
    path('staff_leave_reject/<int:leave_id>/', views.StaffLeaveRejectView.as_view(), name='staff_leave_reject'),

    # Attendance management
    path('admin_view_attendance/', views.AdminViewAttendanceAPIView.as_view(), name='admin_view_attendance'),
    path('admin_get_attendance_dates/', views.AdminGetAttendanceDatesAPIView.as_view(), name='admin_get_attendance_dates'),
    path('admin_get_attendance_student/', views.AdminGetAttendanceStudentAPIView.as_view(), name='admin_get_attendance_student'),

    # Admin profile
    path('admin_profile/', views.AdminProfileView.as_view(), name='admin_profile'),
    path('admin_profile_update/', views.AdminProfileUpdateView.as_view(), name='admin_profile_update'),


  # Fee management
    path('add_fee/', views.AddFeeAPIView.as_view(), name='add_fee'),
    path('view_all_fee/', views.ManageFeeAPIView.as_view(), name='view_all_fee'),
    path('edit_fee/<int:fee_id>/', views.EditFeeAPIView.as_view(), name='edit_fee'),
    path('delete_fee/<int:fee_id>/', views.DeleteFeeAPIView.as_view(), name='delete_fee'),

    # Bill management
    path('add_bill/', views.AddBillAPIView.as_view(), name='add_bill'),
    path('view_all_bill/', views.ManageBillAPIView.as_view(), name='view_all_bill'),
    path('edit_bill/<int:bill_id>/', views.EditBillAPIView.as_view(), name='edit_bill'),
    path('delete_bill/<int:bill_id>/', views.DeleteBillAPIView.as_view(), name='delete_bill'),
    
    
    # Additional API for Students Per Class (Graph data)
    path('students_per_class/', views.StudentsPerClassAPIView.as_view(), name='students_per_class'),
]
