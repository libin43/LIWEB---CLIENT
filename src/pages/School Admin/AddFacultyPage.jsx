import React from 'react'
import Sidebar from '../../components/schoolAdmin/Sidebar'
import AddFaculty from '../../components/schoolAdmin/AddFaculty'
import NavbarAdmin from '../../components/schoolAdmin/NavbarAdmin'

const AddFacultyPage = () => {
  return (
    <div>
        <NavbarAdmin></NavbarAdmin>
        <Sidebar></Sidebar>
        <AddFaculty></AddFaculty>
    </div>
  )
}

export default AddFacultyPage