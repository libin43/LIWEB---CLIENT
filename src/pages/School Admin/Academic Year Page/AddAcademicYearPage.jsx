import React from 'react'
import Sidebar from '../../../components/schoolAdmin/Sidebar'

import NavbarAdmin from '../../../components/schoolAdmin/NavbarAdmin'
import AddAcademicYear from '../../../components/schoolAdmin/academicYear/AddAcademicYear'


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