import React from 'react'
import Sidebar from '../../../components/schoolAdmin/Sidebar'
import NavbarAdmin from '../../../components/schoolAdmin/NavbarAdmin'
import AddFaculty from '../../../components/schoolAdmin/faculty/AddFaculty'

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