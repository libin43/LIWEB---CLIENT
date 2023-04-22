import React from 'react'
import Sidebar from '../../components/schoolAdmin/Sidebar'
import Home from '../../components/schoolAdmin/Home'
import NavbarAdmin from '../../components/schoolAdmin/NavbarAdmin'

const HomePage = () => {
  return (
    <div>
      <NavbarAdmin></NavbarAdmin>
        <Sidebar></Sidebar>
        <Home></Home>
    
    </div>
  )
}

export default HomePage