import React from 'react'
import Sidebar from '../../components/schoolAdmin/Sidebar'
import AddClassRoom from '../../components/schoolAdmin/AddClassRoom'
import NavbarAdmin from '../../components/schoolAdmin/NavbarAdmin'

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