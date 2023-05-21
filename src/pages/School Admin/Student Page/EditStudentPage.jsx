import React from 'react'
import Sidebar from '../../../components/schoolAdmin/Sidebar'
import NavbarAdmin from '../../../components/schoolAdmin/NavbarAdmin'
import EditStudent from '../../../components/schoolAdmin/student/EditStudent'

const EditStudentPage = () => {
  return (
    <div>
      <NavbarAdmin></NavbarAdmin>
      <Sidebar></Sidebar>
      <EditStudent></EditStudent>
    </div>
  )
}

export default EditStudentPage