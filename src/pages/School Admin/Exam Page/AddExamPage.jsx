import React from 'react'
import NavbarAdmin from '../../../components/schoolAdmin/NavbarAdmin'
import Sidebar from '../../../components/schoolAdmin/Sidebar'
import AddExam from '../../../components/schoolAdmin/exam/AddExam'


const AddExamPage = () => {
  return (
    <div>
       <NavbarAdmin></NavbarAdmin>
        <Sidebar></Sidebar>
        <AddExam></AddExam>
    </div>
  )
}

export default AddExamPage