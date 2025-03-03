import React, { useEffect, useState } from 'react';
import BackButton from '../../../components/BackButton';
import '../../../style/pages_css/dashboard/adminHod_css/viewAttendance.css';
import { Admin_Student_Attendence_View } from '../../../api_Data/adminHod_api';

function ViewAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await Admin_Student_Attendence_View();
        setAttendanceData(response?.message);

        // Extract unique class names from attendance data
        const uniqueClasses = [
          ...new Set(response?.message.map((data) => data.student.class_id.name)),
        ];
        setClassData(uniqueClasses);

      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendance();
  }, []);


  const handelChooseClass = (e)=>{
    console.log(e)
    setAttendanceData((prevData)=>{
      if(e=="all"){
        return prevData
      }
      else{
        return prevData.filter((data)=>data.student.class_id.name==e)
      }
    })

  }


  return (
    <>
      <BackButton />
      <div className='admin-view-attendance'>
        <h1>View Attendance</h1>

        <div className='admin-view-attendance-table'>
          <label htmlFor='choose-class'>Choose class:</label>
          <select id='choose-class' onChange={(e)=>handelChooseClass(e.target.value)}>
            <option value="all">All</option>
            {classData.map((data, index) => (
              <option key={index} value={data}>
                {data}
              </option>
            ))}
          </select>

          <table>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((data) => (
                <tr key={data.id}>
                  <td>{data.student.roll_no}</td>
                  <td>{`${data.student.name.first_name} ${data.student.name.last_name}`}</td>
                  <td>{data.status ? 'Present' : 'Absent'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ViewAttendance;
