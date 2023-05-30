import React from 'react'
import { Navigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import FacultyProfile from '../../../components/faculty/profile/FacultyProfile'

const FacultyProfilePage = () => {
  const auth = localStorage.getItem('facultyToken')
  if(auth === null){
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
  return (
    <div>
        <FacultyProfile/>
    </div>
  )
}

export default FacultyProfilePage