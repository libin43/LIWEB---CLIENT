import React from 'react'
import Sidebar from '../../../components/schoolAdmin/Sidebar'
import NavbarAdmin from '../../../components/schoolAdmin/NavbarAdmin'
import AddStudent from '../../../components/schoolAdmin/student/AddStudent'

const AddStudentPage = () => {
  return (
    <div>
      <NavbarAdmin></NavbarAdmin>
      <Sidebar></Sidebar>
      <AddStudent></AddStudent>
    </div>
  )
}

export default AddStudentPage