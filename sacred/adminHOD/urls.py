from django.urls import path
from . import views

urlpatterns = [
    # AdminHOD URLs
    path('admin_home/', views.AdminHomeView.as_view(), name='admin_home'),
    path('add_staff/', views.AddStaffView.as_view(), name='add_staff'),
    path('add_staff_save/', views.AddStaffSaveView.as_view(), name='add_staff_save'),
    path('manage_staff/', views.ManageStaffView.as_view(), name='manage_staff'),
    path('edit_staff/<int:staff_id>/', views.EditStaffView.as_view(), name='edit_staff'),
    path('edit_staff_save/', views.EditStaffSaveView.as_view(), name='edit_staff_save'),
    path('delete_staff/<int:staff_id>/', views.DeleteStaffView.as_view(), name='delete_staff'),

    # Subject management (replacing Course management)
    path('add_subject/', views.AddSubjectView.as_view(), name='add_subject'),
    path('add_subject_save/', views.AddSubjectSaveView.as_view(), name='add_subject_save'),
    path('manage_subject/', views.ManageSubjectView.as_view(), name='manage_subject'),
    path('edit_subject/<int:subject_id>/', views.EditSubjectView.as_view(), name='edit_subject'),
    path('edit_subject_save/', views.EditSubjectSaveView.as_view(), name='edit_subject_save'),
    path('delete_subject/<int:subject_id>/', views.DeleteSubjectView.as_view(), name='delete_subject'),

    # Session management
    path('manage_session/', views.ManageSessionView.as_view(), name='manage_session'),
    path('add_session/', views.AddSessionView.as_view(), name='add_session'),
    path('add_session_save/', views.AddSessionSaveView.as_view(), name='add_session_save'),
    path('edit_session/<int:session_id>/', views.EditSessionView.as_view(), name='edit_session'),
    path('edit_session_save/', views.EditSessionSaveView.as_view(), name='edit_session_save'),
    path('delete_session/<int:session_id>/', views.DeleteSessionView.as_view(), name='delete_session'),

    # Student management
    path('add_student/', views.AddStudentView.as_view(), name='add_student'),
    path('add_student_save/', views.AddStudentSaveView.as_view(), name='add_student_save'),
    path('edit_student/<int:student_id>/', views.EditStudentView.as_view(), name='edit_student'),
    path('edit_student_save/', views.EditStudentSaveView.as_view(), name='edit_student_save'),
    path('manage_student/', views.ManageStudentView.as_view(), name='manage_student'),
    path('delete_student/<int:student_id>/', views.DeleteStudentView.as_view(), name='delete_student'),

    # Email and Username checks
    path('check_email_exist/', views.CheckEmailExistView.as_view(), name='check_email_exist'),
    path('check_username_exist/', views.CheckUsernameExistView.as_view(), name='check_username_exist'),

    # Library management
    path('admin_view_library/', views.AdminViewLibraryView.as_view(), name='admin_view_library'),
    path('admin_update_library/', views.AdminUpdateLibraryView.as_view(), name='admin_update_library'),
    path('admin_delete_library/', views.AdminDeleteLibraryView.as_view(), name='admin_delete_library'),

    # Leave management for students
    path('student_leave_view/', views.StudentLeaveView.as_view(), name='student_leave_view'),
    path('student_leave_approve/<int:leave_id>/', views.StudentLeaveApproveView.as_view(), name='student_leave_approve'),
    path('student_leave_reject/<int:leave_id>/', views.StudentLeaveRejectView.as_view(), name='student_leave_reject'),

    # Leave management for staff
    path('staff_leave_view/', views.StaffLeaveView.as_view(), name='staff_leave_view'),
    path('staff_leave_approve/<int:leave_id>/', views.StaffLeaveApproveView.as_view(), name='staff_leave_approve'),
    path('staff_leave_reject/<int:leave_id>/', views.StaffLeaveRejectView.as_view(), name='staff_leave_reject'),

    # Attendance management
    path('admin_view_attendance/', views.AdminViewAttendanceView.as_view(), name='admin_view_attendance'),
    path('admin_get_attendance_dates/', views.AdminGetAttendanceDatesView.as_view(), name='admin_get_attendance_dates'),
    path('admin_get_attendance_student/', views.AdminGetAttendanceStudentView.as_view(), name='admin_get_attendance_student'),

    # Admin profile
    path('admin_profile/', views.AdminProfileView.as_view(), name='admin_profile'),
    path('admin_profile_update/', views.AdminProfileUpdateView.as_view(), name='admin_profile_update'),
]
