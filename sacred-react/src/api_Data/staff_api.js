import axios from "axios";

// Base URL for the API
const baseUrl = "http://127.0.0.1:8000";

// Retrieve CSRF token from cookies
const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1];

/// ====== Staff Home ======

/**
 * Fetch staff home data
 * @returns {Promise<Object>} Staff home data
 */
const Staff_Home = async () => {
    try {
        const response = await axios.get(`${baseUrl}/staff`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in fetching staff data", error.response.data.message);
    }
};

/// ====== Staff Attendance ======

/**
 * Take student attendance
 * @returns {Promise<Object>} Response data
 */
const Staff_Take_Student_Attendence = async () => {
    try {
        const response = await axios.post(`${baseUrl}/staff/staff_take_attendance/`, {}, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application-json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Taking attendance", error.response.data.message);
    }
};

/**
 * Update student attendance
 * @param {number} id - Student ID
 * @returns {Promise<Object>} Response data
 */
const Staff_Update_Student_Attendence = async (data, id) => {
    try {
        const response = await axios.patch(`${baseUrl}/staff/staff_update_attendance/${id}`, { data }, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application-json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Updating attendance", error.response.data.message);
    }
};

/// ====== Staff Leave ======

/**
 * Apply for leave
 * @returns {Promise<Object>} Response data
 */
const Staff_Apply_Leave = async () => {
    try {
        const response = await axios.post(`${baseUrl}/staff/staff_apply_leave/`, {}, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application-json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Applying Leave", error.response.data.message);
    }
};

/**
 * Delete leave
 * @param {number} id - Leave ID
 * @returns {Promise<Object>} Response data
 */
const Staff_Delete_Leave = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/staff/staff_delete_leave/${id}`, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application-json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Deleting leave", error.response.data.message);
    }
};

/// ====== Staff Profile ======

/**
 * Fetch staff profile data
 * @returns {Promise<Object>} Staff profile data
 */
const Staff_Profile = async () => {
    try {
        const response = await axios.get(`${baseUrl}/staff/staff_profile/`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Fetching staff profile data", error.response.data.message);
    }
};

/// ====== Staff Exam ======

/**
 * Add exam notice
 * @param {Object} data - Exam data
 * @returns {Promise<Object>} Response data
 */
const Staff_Add_Exam = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/staff/staff_add_exam_notice/`, data, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application-json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Adding Exam Routine", error.response.data.message);
    }
};

/**
 * Delete exam notice
 * @param {number} id - Exam notice ID
 * @returns {Promise<Object>} Response data
 */
const Staff_Delete_Exam = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/staff/staff_delete_exam_notice/${id}`, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application-json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in deleting exam notice", error.response.data.message);
    }
};

/// ====== Staff Exam Results ======

/**
 * Add exam result
 * @param {Object} data - Exam result data
 * @returns {Promise<Object>} Response data
 */
const Staff_Add_Result = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/staff/staff_add_exam_result/`, data, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application-json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Adding exam result", error.response.data.message);
    }
};

/**
 * Delete exam result
 * @param {number} id - Exam result ID
 * @returns {Promise<Object>} Response data
 */
const Staff_Delete_Result = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/staff/staff_delete_exam/${id}/`, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application-json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in deleting exam result", error.response.data.message);
    }
};

/// ====== Staff Library ======

/**
 * View library data
 * @returns {Promise<Object>} Library data
 */
const Staff_View_Libaray = async () => {
    try {
        const response = await axios.get(`${baseUrl}/staff/satff_view_library/`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Fetching library data", error.response.data.message);
    }
};

/**
 * Update library data
 * @param {Object} data - Library data
 * @param {string} id - Library ID
 * @returns {Promise<Object>} Response data
 */
const Staff_Update_Library = async (data, id) => {
    try {
        const response = await axios.patch(`${baseUrl}/staff/staff_update_library/${id}/`, { data }, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application-json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Updating library data", error.response.data.message);
    }
};

/**
 * Delete library data
 * @param {number} id - Library ID
 * @returns {Promise<Object>} Response data
 */
const Staff_Delete_Library = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/staff/staff_delete_library/${id}/`, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application-json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Deleting library data", error.response.data.message);
    }
};

/// ====== Staff Teaches ======

/**
 * Fetch total students taught by staff
 * @returns {Promise<Object>} Total students data
 */
const Staff_Teaches_TotalStudent = async () => {
    try {
        const response = await axios.get(`${baseUrl}/staff/staff_teaches_total_subjects/`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in fetching Staff teaches students", error.response.data.message);
    }
};

/**
 * Fetch total subjects taught by staff
 * @returns {Promise<Object>} Total subjects data
 */
const Staff_Teaches_TotalSubject = async () => {
    try {
        const response = await axios.get(`${baseUrl}/staff/staff_teaches-total_subjects/`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in fetching Staff teaches subjects", error.response.data.message);
    }
};

/// ====== Staff Notices ======

/**
 * Fetch staff notices
 * @returns {Promise<Object>} Notices data
 */
const Staff_Notice = async () => {
    try {
        const response = await axios.get(`${baseUrl}/staff/notices/`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in fetching notices", error.response.data.message);
    }
};

export {
    Staff_Home,
    Staff_Take_Student_Attendence,
    Staff_Update_Student_Attendence,
    Staff_Apply_Leave,
    Staff_Delete_Leave,
    Staff_Profile,
    Staff_Add_Exam,
    Staff_Delete_Exam
};
