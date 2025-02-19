import axios from "axios";

// Base URL for the API
const baseUrl = "http://127.0.0.1:8000";


// Retrieve CSRF token
const csrfToken =  document.cookie.match(/csrftoken=([^;]+)/)?.[1];

// Function to fetch student home data
const Student_Home = async () => {
    try {
        const response = await axios.get(`${baseUrl}/student/`, {
         
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching student data", error.response?.data?.message);
    }
};



// Function to view student attendance
const Student_View_Attendance = async () => {
    try {
        const response = await axios.get(`${baseUrl}/student/student_view_attendance`, {
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
        const response = await axios.get(`${baseUrl}/student/student_view_library`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching student library data", error.response?.data?.message);
    }
};

// Function to fetch student notices
const Student_Notice = async () => {
    try {
        const response = await axios.get(`${baseUrl}/student/student_notice/`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching student notice data", error.response?.data?.message);
    }
};


// Function to get  Student leave report
const Student_Leave_Report = async () => {
    try{
        const response = await axios.get(`${baseUrl}/student/student_leave_report`, {
            withCredentials: true,
        });
        return response.data;
    }
catch (error) {
    console.error("Error in fetching student leave report", error.response?.data?.message);
    }
}

// Function to apply for leave
const Student_Apply_Leave = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/student/student_apply_leave/`, 
            data,
            {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json"
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
        const response = await axios.get(`${baseUrl}/student/student_view_homework/`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching student homework data", error.response?.data?.message);
    }
};



// Function to submit student homework
const Student_Submit_HomeWork = async (homeworkId, files) => {
    try {
        // Create a FormData object to append the file and other fields
        const formData = new FormData();
        
        // Loop through all files and append each one to FormData
        for (let i = 0; i < files.length; i++) {
            formData.append("submission_file", files[i]);  // Append each file with the same field name as the backend expects
        }

        // Make the API request to submit the homework
        const response = await axios.post(
            `${baseUrl}/student/student_submit_homework/${homeworkId}/`, 
            formData, // Pass the FormData object
            {
                headers: {
                    "X-CSRFToken": csrfToken,  // CSRF Token for security
                    "Content-Type": "multipart/form-data",  // Important for file uploads
                },
                withCredentials: true,  // If you're using cookies for session management
            }
        );
        
        return response.data;  // Return the response data if submission is successful
    } catch (error) {
        // Log any errors that happen during the submission
        console.error("Error in submitting homework", error.response?.data?.message);
    }
};


// Export all functions
export {
    Student_Home,
    Student_View_Attendance,
    Student_View_Result,
    Student_View_Bill,
    Student_View_Library,
    Student_Notice,
    Student_Leave_Report,
    Student_Apply_Leave,
    Student_View_HomeWork,
    Student_Submit_HomeWork,
};
