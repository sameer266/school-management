import axios from "axios";

// Base URL for the API
const base_URL = "http://127.0.0.1:8000";

// Extract CSRF token from cookies
const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken"))
    ?.split("=")[1];

// Function to handle API errors
const handleError = (error, message) => {
    alert(`${message}: ${error.response?.data?.message || error.message}`);
};

//=========================================
// =========== AdminHod API functions ================

// Fetch AdminHod home data
const AdminHod_Home = async () => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// Update Admin profile
const Admin_Profile_Update = async (data) => {
    try {
        const response = await axios.patch(`${base_URL}/adminHod/edit_profile/`, data, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in updating profile");
    }
};

// ==============================================  
//================= Staff  Api functions =============

// Add new staff
const AdminHod_Add_Staff = async (data) => {
    try {
        const response = await axios.post(`${base_URL}/adminHod/add_staff/`, data, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in adding staff");
    }
};

// View all staff
const AdminHod_View_Staff = async () => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/view_all_staff/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// Delete staff by ID
const AdminHod_Delete_Staff = async (id) => {
    try {
        const response = await axios.delete(`${base_URL}/adminHod/delete_staff/${id}/`, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in deleting staff");
    }
};

// Update staff by ID
const AdminHod_Update_Staff = async (id, data) => {
    try {
        const response = await axios.patch(`${base_URL}/adminHod/edit_staff/${id}/`, data, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in updating staff");
    }
};


// ==============================================
//================= Student  Api functions =============

// Add new student
const AdminHod_Add_Student = async (data) => {
    try {
        const response = await axios.post(`${base_URL}/adminHod/add_student/`, data, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in adding student");
    }
};

// View all students
const AdminHod_View_Student = async () => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/view_all_student/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// Delete student by ID
const AdminHod_Delete_Student = async (id) => {
    try {
        const response = await axios.delete(`${base_URL}/adminHod/delete_student/${id}/`, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in deleting student");
    }
};

// Update student by ID
const AdminHod_Update_Student = async (id, data) => {
    try {
        const response = await axios.patch(`${base_URL}/adminHod/edit_student/${id}/`, data, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in updating student");
    }
};


// ==============================================
//================= Subject  Api functions =============

// Add new subject
const AdminHod_Add_Subject = async (data) => {
    try {
        const response = await axios.post(`${base_URL}/adminHod/add_subject/`, data, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in adding subject");
    }
};

// View all subjects
const AdminHod_View_Subject = async () => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/view_all_subject/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// Delete subject by ID
const AdminHod_Delete_Subject = async (id) => {
    try {
        const response = await axios.delete(`${base_URL}/adminHod/delete_subject/${id}/`, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in deleting subject");
    }
};

// Update subject by ID
const AdminHod_Update_Subject = async (id, data) => {
    try {
        const response = await axios.patch(`${base_URL}/adminHod/edit_subject/${id}/`, data, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in updating subject");
    }
};


// ==============================================
//================= Attendance  Api functions =============

// View student attendance
const Admin_Student_Attendence_View = async () => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/student_view_attendence/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// Get student attendance by date
const Admin_Student_Get_Attendence_By_Date = async (id) => {
    try {
        const response = await axios.post(`${base_URL}/adminHod/student_get_attendence_date/${id}/`, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// View student leave requests
const Admin_Student_Leave_View = async () => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/student_view_leave/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// Approve student leave request
const Admin_Student_Leave_Approve = async (id) => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/student_leave_approve/${id}/`, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};


// ==============================================
//================= Leave  Api functions =============

// Reject student leave request
const Admin_Student_Leave_Reject = async (id) => {
    try {
        const response = await axios.post(`${base_URL}/adminHod/student_leave_reject/${id}`, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// View staff leave requests
const Admin_Staff_Leave_View = async () => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/staff_view_leave/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// Approve staff leave request
const Admin_Staff_Leave_Approve = async (id) => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/staff_leave_approve/${id}/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// Reject staff leave request
const Admin_Staff_Leave_Reject = async (id) => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/staff_leave_reject/${id}/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};



// ==============================================
//================= Fee  Api functions =============

// View all fees
const Admin_ViewAll_Fee = async () => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/view_all_fee/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// Add new fee
const Admin_Add_Fee = async (data) => {
    try {
        const response = await axios.post(`${base_URL}/adminHod/add_fee/`, data, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in adding fee");
    }
};



// Update fee by ID
const Admin_Update_Fee = async (id, data) => {
    try {
        const response = await axios.patch(`${base_URL}/adminHod/edit_fee/${id}/`, data, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in updating fee");
    }
};

// Delete fee by ID
const Admin_Delete_Fee = async (id) => {
    try {
        const response = await axios.delete(`${base_URL}/adminHod/delete_fee/${id}/`, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in deleting fee");
    }
};




// ==============================================
//================= Bill  Api functions =============

// View all bills
const Admin_ViewAll_Bill = async () => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/view_all_bill/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

// Add new bill
const Admin_Add_Bill = async (data) => {
    try {
        const response = await axios.post(`${base_URL}/adminHod/add_bill/`, data, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in adding bill");
    }
};

// Update bill by ID
const Admin_Update_Bill = async (id, data) => {
    try {
        const response = await axios.patch(`${base_URL}/adminHod/edit_bill/${id}/`, data, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in updating bill");
    }
};

// Delete bill by ID
const Admin_Delete_Bill = async (id) => {
    try {
        const response = await axios.delete(`${base_URL}/adminHod/delete_bill/${id}/`, {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        handleError(error, "Error in deleting bill");
    }
};




// ==============================================
//================= Student  Per Class  Api functions =============

// View students per class
const Admin_Student_PerClass_View = async () => {
    try {
        const response = await axios.get(`${base_URL}/adminHod/student_per_class/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        handleError(error, "Error in getting data");
    }
};

export {
    AdminHod_Home,
    Admin_Profile_Update,
    AdminHod_Add_Staff,
    AdminHod_View_Staff,
    AdminHod_Delete_Staff,
    AdminHod_Update_Staff,
    AdminHod_Add_Student,
    AdminHod_View_Student,
    AdminHod_Delete_Student,
    AdminHod_Update_Student,
    AdminHod_Add_Subject,
    AdminHod_View_Subject,
    AdminHod_Delete_Subject,
    AdminHod_Update_Subject,
    Admin_Student_Attendence_View,
    Admin_Student_Get_Attendence_By_Date,
    Admin_Student_Leave_View,
    Admin_Student_Leave_Approve,
    Admin_Student_Leave_Reject,
    Admin_Staff_Leave_View,
    Admin_Staff_Leave_Approve,
    Admin_Staff_Leave_Reject,
    Admin_ViewAll_Fee,
    Admin_Add_Fee,
    Admin_Update_Fee,
    Admin_Delete_Fee,
    Admin_ViewAll_Bill,
    Admin_Add_Bill,
    Admin_Update_Bill,
    Admin_Delete_Bill,
    Admin_Student_PerClass_View,
};
