import React from 'react'
import NavbarAdmin from '../../components/schoolAdmin/NavbarAdmin'
import Sidebar from '../../components/schoolAdmin/Sidebar'
import AddSubject from '../../components/schoolAdmin/AddSubject'


const AddSubjectPage = () => {
  return (
    <div>
      <NavbarAdmin></NavbarAdmin>
      <Sidebar></Sidebar>
      <AddSubject></AddSubject>
    </div>
  )
}

export default AddSubjectPage