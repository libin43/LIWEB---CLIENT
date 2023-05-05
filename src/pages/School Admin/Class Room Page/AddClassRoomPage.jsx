import React from 'react'
import Sidebar from '../../../components/schoolAdmin/Sidebar'
import NavbarAdmin from '../../../components/schoolAdmin/NavbarAdmin'
import AddClassRoom from '../../../components/schoolAdmin/classRoom/AddClassRoom'

const AddClassRoomPage = () => {
  return (
    <div>
       <NavbarAdmin></NavbarAdmin>
        <Sidebar></Sidebar>
        <AddClassRoom></AddClassRoom>
    </div>
  )
}

export default AddClassRoomPage