import React from 'react'
import Sidebar from '../../components/schoolAdmin/Sidebar'
import AddStudent from '../../components/schoolAdmin/AddStudent'
import NavbarAdmin from '../../components/schoolAdmin/NavbarAdmin'

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