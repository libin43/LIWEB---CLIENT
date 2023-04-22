import React, {useEffect} from 'react'
import { Navbar } from 'flowbite-react'
import { Dropdown } from 'flowbite-react'
import { Avatar } from 'flowbite-react'
import { useSelector } from 'react-redux' 
import { useNavigate } from 'react-router-dom'

const NavbarAdmin = () => {
  const name = useSelector(state => state.schoolAdmin.schoolAdminName)
  const schoolName = useSelector(state => state.schoolAdmin.schoolName)


console.log(name,'............////////');
  return (
    <div>
   <Navbar
  fluid={true}
  className='border-gray-200 bg-white px-2 py-2.5 dark:border-black dark:bg-black sm:px-4 fixed w-full z-10'
>
  <Navbar.Brand >
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      className="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span className="self-center whitespace-nowrap text-xl ml-8 font-semibold dark:text-white">
    {schoolName ? schoolName : 'School Name'}
    </span>
   
  </Navbar.Brand>
  <div className="flex md:order-2">
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}
    >
      <Dropdown.Header>
        <span className="block text-sm">
          {name ? name : 'Admin'}
        </span>
        <span className="block truncate text-sm font-medium">
          name@flowbite.com
        </span>
      </Dropdown.Header>
      <Dropdown.Item>
        Dashboard
      </Dropdown.Item>
      <Dropdown.Item>
        Settings
      </Dropdown.Item>
      <Dropdown.Item>
        Earnings
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  </div>

</Navbar>
    </div>
  )
}

export default NavbarAdmin