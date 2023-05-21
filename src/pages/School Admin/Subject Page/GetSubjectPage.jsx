import React from 'react'
import NavbarAdmin from '../../../components/schoolAdmin/NavbarAdmin'
import Sidebar from '../../../components/schoolAdmin/Sidebar'
import GetSubject from '../../../components/schoolAdmin/subject/GetSubject'

const GetSubjectPage = () => {
  return (
    <div>
      <NavbarAdmin></NavbarAdmin>
      <Sidebar></Sidebar>
      <GetSubject></GetSubject>
    </div>
  )
}

export default GetSubjectPage