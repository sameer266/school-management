import axios from "axios";

// Base URL for the API
const baseUrl = "http://127.0.0.1:8000";

// Retrieve CSRF token from cookies
const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1];

/// ====== Staff Home ======

/**
 * Fetch staff home data
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



// Staff get All Students attendance 
const Staff_TotalAttendance_Students=async (id)=>{
try {
    const response= await axios.get(`${baseUrl}/staff/get_all_students_attendance/${id}/`,
        { withCredentials:true}
    );
    return response.data;
} catch (error) {
    console.log("Error in fetching total attendance of Students",error.response.data.message)
    
}
}


/**
 *  Staff Total Students Data 
 */

const Staff_Total_StudentsName=async (class_name)=>{

    try {
        const response= await axios.get(`${baseUrl}/staff/staff_Total_StudentsName/`,
            {
                withCredentials:true
            }
        );
        return response.data;

    } catch (error) {
        console.log("Error in fetching Students data",error.response.data.message)
        
    }
}

// ----Get students name based on  selected class---
const Staff_Selected_Class_StudentName=async (id)=>{
try{
    const response = await axios.get(`${baseUrl}/staff/staff_ClassBased_StudentsName/${id}`,
        {  withCredentials:true}
    );
    return response.data;
}
catch(error){

    console.log("Error in Getting Data of students based on selected Class ",error.response.data.message);
}
}

const Staff_Total_SubjectTeach=async ()=>{
    try{

        const response = await axios.get(`${baseUrl}/staff/staff_teaches_total_subjects/`,
            {
                withCredentials:true
            }
        );
        return response.data;
        
    }
    catch(error){
        console.log("Error in fetching Staff Subjects" ,error.response.data.message);
    }


}

// ---- Get Staff Teaches Classes ----
const Staff_Teaches_Classes=async ()=>{
    try {
        const response= await axios.get(`${baseUrl}/staff/staff_teaches_classes/`,
            {
                withCredentials:true
            }
        );
        return response.data;

    } catch (error) {
        console.log("Error in fetching Staff Teaches Classes",error.response.data.message);
    }
}   
/**
 * Take student attendance
 */
const Staff_Take_Student_Attendence = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/staff/staff_take_attendance/`, data, {
            headers: {
                "X-CSRFToken": csrfToken,
                
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
 */
const Staff_Update_Student_Attendence = async (data, id) => {
    try {
        const response = await axios.patch(`${baseUrl}/staff/staff_update_attendance/${id}`, { data }, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Updating attendance", error.response.data.message);
    }
};

// ---Get one Students Attendance ---
const Staff_GetOne_Student_Attendance=async ()=>{

try {
    const response= await axios.get(`${baseUrl}/staff/staff_GetOne_Student_Attendance/`,
        {
            withCredentials:true
        }
    );
    return response.data;
} catch (error) {
    console.log("Error in Getting One Student Attendance ", error.response.data.message);
    
}
}

/// ====== Staff Leave ======


// --- Get All Leave Requests ---
const Staff_Get_All_Leave_Requests=async ()=>{
    try {
        const response= await axios.get(`${baseUrl}/staff/staff_get_all_leave_requests/`,
            {
                withCredentials:true
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error in Getting All Leave Requests",error.response.data.message)
    }
}
/**
 * Apply for leave
 */
const Staff_Apply_Leave = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/staff/staff_apply_leave/`,
            data,
             {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json"
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
 */
const Staff_Delete_Leave = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/staff/staff_delete_leave/${id}/`, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Deleting leave", error.response.data.message);
    }
};



/// ====== Staff Exam ======


//--- Get Exam Notice ---
const Staff_ExamNotice=async ()=>{
    try {
        const response = await axios.get(`${baseUrl}/staff/staff_get_examnotice/`,
            {withCredentials:true}
        );
        return response.data;
    } catch (error) {
        console.log("Error in Fetching Exam notice ",error.response.data.message)
        
    }
}

/**
 * Add exam notice
 */
const Staff_Add_Exam = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/staff/staff_add_exam_notice/`,
             data, 
             {
            headers: {
                "X-CSRFToken": csrfToken,
                 "Content-Type":"multipart/form-data"

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
 */
const Staff_Delete_Exam = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/staff/staff_delete_exam_notice/${id}/`, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in deleting exam notice", error.response.data.message);
    }
};

/// ====== Staff Exam Results ======

// ---- Get All Exam Results ----
const Staff_Get_All_Exam_Results=async (id)=>{
    try {
        const response= await axios.get(`${baseUrl}/staff/staff_get_all_exam_results/${id}/`,   
            {
                withCredentials:true
            }
        );
        return response.data;
        
    } catch (error) {
        console.log("Error in fetching All Exam Results",error.response.data.message);
    }
}   
/**
 * Add exam result
 * @param {Object} data - Exam result data
 */
const Staff_Add_Result = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/staff/staff_add_exam_result/`, 
            data, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json"
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
 */
const Staff_Delete_Result = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/staff/staff_delete_exam/${id}/`, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json"
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
 */
const Staff_List_Libaray = async () => {
    try {
        const response = await axios.get(`${baseUrl}/staff/staff_view_library/`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Fetching library data", error.response.data.message);
    }
};


// ----- Staff  Upload Library ----------

const Staff_Add_Library= async (data)=>{

    try {
        const response = await axios.post(`${baseUrl}/staff/staff_add_library/`,
            data,
            {
                headers:{
                    "X-CSRFToken":csrfToken,
                   "Content-Type":"multipart/form-data"

                },
                withCredentials:true
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error in Uplaoding Library", error.response.data.message)
    }
    
}

// ----- Staff Update Libaray ------------
const Staff_Update_Library = async ( id,data) => {
    try {
        const response = await axios.patch(`${baseUrl}/staff/staff_update_library/${id}/`, 
            data , {
            headers: {
                "X-CSRFToken": csrfToken,
               "Content-Type":"multipart/form-data"
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
 */
const Staff_Delete_Library = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/staff/staff_delete_library/${id}/`, {
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in Deleting library data", error.response.data.message);
    }
};


/// ====== Staff Notices ======

/**
 * Fetch staff notices
 */
const Staff_Notice = async () => {
    try {
        const response = await axios.get(`${baseUrl}/staff/staff_notices/`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Error in fetching notices", error.response.data.message);
    }
};

// =========== Staff Homeworks ========

const Staff_Add_Homework=async (data)=>{
    try {
        const response = await axios.post(`${baseUrl}/staff/staff_add_homework/`,
            data,
            {
                headers: {
                    "X-CSRFToken": csrfToken,
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        return response.data;
        
    } catch (error) {
        console.log("error in Uploading Homework ",error.response.data.message)
        
    }
}

// --- Staff delete homework ------
const Staff_Delete_Homework= (id)=>{
    try{
    const response= axios.delete(`${baseUrl}/staff/staff_delete_homework/${id}/`,
        {
            headers:{
                "X-CSRFToken":csrfToken,
                "Content-Type": "application/json"
            },
            withCredentials:true
        }
    );
    return response.data;
    }

    catch(error){
        console.log("Error in deleting homework",error.response.data.message)

    }
    
}


//---- List all Homeworks --------
const Staff_List_Homework=async ()=>{
    try{
    const response = await axios.get(`${baseUrl}/staff/staff_list_homework/`,
        { withCredentials:true}
    );
    return response.data;

}
catch(error){

console.log("Error in fetching homework list ",error.response.data.message);
}
}
// ---- List all Submitted Homework of students ------
const Staff_Submitted_HomeworkList= async ()=>{
    try{
    const response = await axios.get(`${baseUrl}/staff/staff_submitted_homeworklist/`,
        {
            withCredentials:true
        }
    );
    return response.data;
}
catch(error){
    console.log("error in fetching submitted Homeworks" , error.response.data.message);

}

}


// ---- Home Check status making True -------
const Staff_Check_Homework=async (id)=>{
    try {
        const response= await axios.post(`${baseUrl}/staff/staff_check_homework/`,
            {
                id:id
            },
            {
                headers:{
                    "X-CSRFToken":csrfToken,
                    "Content-Type": "application/json"
                },
                withCredentials:true

            }
            
        );
        return  response.data;
    } catch (error) {
        console.log("error in updating status",error.response.data.message)
        
    }
}



export {
    Staff_Home,
    Staff_Total_StudentsName,
    Staff_Total_SubjectTeach,
    Staff_Teaches_Classes,

    Staff_Selected_Class_StudentName,
  
    Staff_GetOne_Student_Attendance,
    Staff_Take_Student_Attendence,
    Staff_TotalAttendance_Students,
    Staff_Update_Student_Attendence,

    Staff_Get_All_Leave_Requests,
    Staff_Apply_Leave,
    Staff_Delete_Leave,
    
    Staff_ExamNotice,
    Staff_Add_Exam,
    Staff_Delete_Exam,

    Staff_Get_All_Exam_Results,
    Staff_Add_Result,
    Staff_Delete_Result,

    Staff_Add_Homework,
    Staff_List_Homework,
    Staff_Delete_Homework,
    Staff_Submitted_HomeworkList,
    Staff_Check_Homework,

    Staff_Add_Library,
    Staff_List_Libaray,
    Staff_Delete_Library,
    Staff_Update_Library,
    
    Staff_Notice,
};
