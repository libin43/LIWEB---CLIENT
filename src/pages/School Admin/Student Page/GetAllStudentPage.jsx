import React from 'react'
import Sidebar from '../../../components/schoolAdmin/Sidebar'
import NavbarAdmin from '../../../components/schoolAdmin/NavbarAdmin'
import GetStudent from '../../../components/schoolAdmin/student/GetStudent'


const GetAllStudentPage = () => {
  return (
    <div>
      <NavbarAdmin></NavbarAdmin>
      <Sidebar></Sidebar>
      <GetStudent></GetStudent>
    </div>
  )
}

export default GetAllStudentPage