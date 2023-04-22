import React from 'react'
import Sidebar from '../../components/schoolAdmin/Sidebar'
import AddAcademicYear from '../../components/schoolAdmin/AddAcademicYear'
import NavbarAdmin from '../../components/schoolAdmin/NavbarAdmin'


const AddAcademicYearPage = () => {
  return (
    <div>
        <NavbarAdmin></NavbarAdmin>
        <Sidebar></Sidebar>
        <AddAcademicYear></AddAcademicYear>
    </div>
  )
}

export default AddAcademicYearPage