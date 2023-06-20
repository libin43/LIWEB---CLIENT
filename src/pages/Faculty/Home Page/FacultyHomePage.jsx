import React from 'react'
import FacultyHome from '../../../components/faculty/home/FacultyHome'
import {toast} from 'react-toastify';
import { Navigate } from 'react-router-dom';


const FacultyHomePage = () => {
  const auth = localStorage.getItem('facultyToken');
  if (auth === null) {
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
    return (
      <Navigate to={'/faculty/login'} />
    )
  }
  return (
    <div>
      <FacultyHome />
    </div>
  )
}

export default FacultyHomePage