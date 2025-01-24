import axios from "axios";

// Base URL for the API
const baseUrl = "http://127.0.0.1:8000";

// Extract CSRF token from cookies
const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken"))
    ?.split("=")[1];

// Function to fetch student home data
const Student_Home = async () => {
    try {
        const response = await axios.get(`${baseUrl}/student/`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching student data", error.response?.data?.message);
    }
};

// Function to update student profile
const Student_Update_Profile = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/student/student_update_profile`, data, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in updating student profile", error.response?.data?.message);
    }
};

// Function to view student attendance
const Student_View_Attendance = async () => {
    try {
        const response = await axios.get(`${baseUrl}/student/attendance`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching student attendance data", error.response?.data?.message);
    }
};

// Function to view student result
const Student_View_Result = async () => {
    try {
        const response = await axios.get(`${baseUrl}/student/student_view_result`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching student result data", error.response?.data?.message);
    }
};

// Function to view student bill
const Student_View_Bill = async () => {
    try {
        const response = await axios.get(`${baseUrl}/student/student_bill`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching student fee data", error.response?.data?.message);
    }
};

// Function to view student library data
const Student_View_Library = async () => {
    try {
        const response = await axios.get(`${baseUrl}/student_view_library`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching student library data", error.response?.data?.message);
    }
};

// Function to fetch student notices
const student_Notice = async () => {
    try {
        const response = await axios.get(`${baseUrl}/student/student_notice`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching student notice data", error.response?.data?.message);
    }
};

// Function to apply for leave
const Student_Apply_Leave = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/student/student_apply_leave`, data, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in applying leave", error.response?.data?.message);
    }
};

// Function to view student homework
const Student_View_HomeWork = async () => {
    try {
        const response = await axios.get(`${baseUrl}/student/student_view_homework`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching student homework data", error.response?.data?.message);
    }
};

// Function to submit student homework
const Student_Submit_HomeWork = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/student/student_submit_homework`, data, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in submitting homework", error.response?.data?.message);
    }
};

// Export all functions
export {
    Student_Home,
    Student_Update_Profile,
    Student_View_Attendance,
    Student_View_Result,
    Student_View_Bill,
    Student_View_Library,
    student_Notice,
    Student_Apply_Leave,
    Student_View_HomeWork,
    Student_Submit_HomeWork,
};
