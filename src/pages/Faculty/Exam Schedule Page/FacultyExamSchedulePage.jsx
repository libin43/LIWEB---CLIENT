import React from 'react'
import FacultySelectYear from '../../../components/faculty/year/FacultySelectYear'
import {toast} from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectFaculty } from '../../../redux/reducers/facultySlice';
import FacultyExamSchedule from '../../../components/faculty/viewScheduleExam/FacultyExamSchedule';

const FacultyExamSchedulePage = () => {
  const auth = localStorage.getItem('facultyToken');
  const {academicYearID} = useSelector(selectFaculty);
  console.count('exam schedule page '); 
  if(auth !==null){
    return (
      <div>
          <FacultySelectYear/>
          {
            academicYearID !=='' ?
            <FacultyExamSchedule selectedYearID= {academicYearID}/>:
            ''
          }
      </div>
    )
  } else {
    toast.warn('Unauthorized Access', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
    localStorage.removeItem('facultyToken');
    return(
      <Navigate to={'/faculty/login'}/>
  )
  }
}

export default FacultyExamSchedulePage