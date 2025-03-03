import React, { useEffect, useState } from 'react';
import { AdminHod_View_Subject, AdminHod_Add_Subject, AdminHod_Delete_Subject } from '../../../../api_Data/adminHod_api';
import BackButton from '../../../../components/BackButton';
import '../../../../style/pages_css/dashboard/adminHod_css/subject/manageSubject.css';
import toast, { Toaster } from 'react-hot-toast';
import { MdDeleteOutline } from "react-icons/md";

function SubjectManage() {
  const [showAddField, setShowAddField] = useState(true);
  const [subjectData, setSubjectData] = useState([]);
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await AdminHod_View_Subject();
        if (response?.success) {
          setSubjectData(response?.message);
        } else {
          toast.error("Failed to fetch subjects");
        }
      } catch (error) {
        toast.error("An error occurred while fetching subjects");
      }
    };
    fetchSubjectData();
  }, []);

  const handleNewSubject = () => {
    setShowAddField(false);
  };

  const handleOnSubmit = async () => {
    try {
      const response = await AdminHod_Add_Subject(newSubject);
      if (response?.success) {
        toast.success("Subject Added Successfully");
        setSubjectData((prev) => [...prev, { subject_name: newSubject }]);
      } else {
        toast.error("Error in Adding Subject");
      }
    } catch (error) {
      toast.error("An error occurred while adding the subject");
    }

    setNewSubject("");
    setShowAddField(true);
  };

  const handleOnDelete=async (id)=>{
    const isConfirmed = window.confirm("Are you sure you wanted to delete Subject");
    if(isConfirmed){
      const response= await AdminHod_Delete_Subject(id);
      if(response.success)
        { toast.success("Delete Success")
          setSubjectData((prev) => prev.filter((data) => data.id !== id));

        }
    }
  }

  return (
    <>
      <BackButton />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      <div className='admin-view-subject'>
        <h2>View Subjects</h2>
        <ul>
          {subjectData.map((data, index) => (
            <li key={index} className='subject-item'>
              {data.subject_name}
              <MdDeleteOutline className='delete-icon' onClick={() => handleOnDelete(data.id)} />
            </li>
          ))}
        </ul>

        {showAddField ? (
          <button className="add-subject-button" onClick={handleNewSubject}>
            Add Subject
          </button>
        ) : (
          <div className='subject-add-input'>
            <label htmlFor='subject'>Subject Name</label>
            <input
              type='text'
              id='subject'
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder='Enter subject name'
            />
            <button onClick={handleOnSubmit}>Submit</button>
            <button onClick={() => setShowAddField(true)}>Cancel</button>
          </div>
        )}
      </div>
    </>
  );
}

export default SubjectManage;