import React, { useEffect } from 'react'
import { Outlet, Navigate, useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import NavbarCommon from '../components/navbar/NavbarCommon';
import NavbarAdmin from '../components/schoolAdmin/navbar/NavbarAdmin'

import Sidebar from '../components/schoolAdmin/sidebar/Sidebar'


const ProtectedRoutes = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const auth = (() => {
    switch (props.role) {
      case 'school_admin':
        const schoolAdminToken = localStorage.getItem('schoolAdminToken')
        if(schoolAdminToken){
          try{
            const decodedToken = decode(schoolAdminToken);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
              return null;
            }
            return schoolAdminToken;
          }catch(error){
            navigate(`/${props.role}/login`)
          }
        } else {
          return null
        }
      case 'faculty':
        const facultytoken = localStorage.getItem('facultyToken')
        if(facultytoken){
          try{
            const decodedToken = decode(facultytoken);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
              return null;
            }
            return facultytoken;
          }catch(error){
            navigate(`/${props.role}/login`)
          }
        } else {
          return null
        }
      default:
        return null;
    }
  })();

  useEffect(()=>{
    // auth()
  },[location])

  return (
    <>
    {auth && (
      <>
        {props.role === 'faculty' && <NavbarCommon />}
        {props.role === 'school_admin' && (
          <>
            <NavbarAdmin />
            <Sidebar />
          </>
        )}
        <Outlet />
      </>
    )}
    {!auth && <Navigate to={`/${props.role}/login`} />}
  </>
  )
}

export default ProtectedRoutes