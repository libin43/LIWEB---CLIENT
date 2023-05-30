import { useState } from "react"
import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dropdown } from 'flowbite-react'
import { Navigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearFacultyToken } from "../../redux/reducers/facultySlice";
import { useGetFacultyDataQuery } from "../../api/faculty/apiSlice";


function NavbarCommon() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleMenu, setToggleMenu] = useState(false);

  const {data, isLoading, isError, error} = useGetFacultyDataQuery();



  const handleFacultySignout = () => {
    console.log('fn called');
    dispatch(clearFacultyToken())
    navigate('/faculty/login');
  }

  if (isLoading) {
    return (
      <div role="status" className='flex justify-center items-center h-screen'>
        <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (isError) {
    console.log(error,'err in navbar');
    if(error?.status === 401){
      toast.warn('Unauthorized Access', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          })
          localStorage.removeItem('facultyToken');
          return(
            <Navigate to={'/faculty/login'}/>
          )
  }
  }

  if(data){
    console.count('navbar render');
    console.log(data,'navbar');
    const {facultyImageUrl} = data.faculty
    const {facultyName} = data.faculty
    
    return (
      <div className="nav_common">
        <nav className="bg-cyan-950">
          <div className="mx-auto">
            <div className="flex mx-auto justify-between w-5/6 ">
              {/* Primary menu and logo */}
              <div className="flex items-center gap-16 my-12">
                {/* logo */}
                <div>
                  <a
                    href="/"
                    className="flex gap-1 font-bold text-gray-700 items-center "
                  >
                    <PaperAirplaneIcon className="h-6 w-6 text-primary" />
                    <span>Liweb</span>
                  </a>
                </div>
                {/* primary */}
                <div className="hidden lg:flex gap-8 text-neutral-50">
                  <Link to={'/faculty/home'} className="hover:text-slate-300">Home</Link>
                  <Link className="hover:text-slate-300">Subjects</Link>
                  <Link to={'/faculty/exam_subjects_schedule'} className="hover:text-slate-300">Examination</Link>
                  <Link className="hover:text-slate-300">Results</Link>
                  <Link to={'/faculty/classes_incharge'} className="hover:text-slate-300">Class Incharge</Link>
                </div>
  
              </div>
                {/* Profile dropdown */}
              <div className="flex md:order-2 my-auto">
                <Dropdown
                  arrowIcon={false}
                  inline={true}
                  label={
                    <img
                      src={facultyImageUrl}
                      alt="User settings"
                      className="w-16 h-16 rounded-full"
                    />
                  }
                >
                  <Dropdown.Header className="bg-white">
                    <span className="block text-sm"></span>
                    <span className="block truncate text-sm font-medium">
                      {facultyName}
                    </span>
                  </Dropdown.Header>
  
                  <Link to={'/faculty/profile'}><Dropdown.Item className="bg-white">Profile</Dropdown.Item></Link>
                  <Dropdown.Divider />
                  <Dropdown.Item className="bg-white" onClick={handleFacultySignout}>Sign out</Dropdown.Item>
            
                </Dropdown>
              </div>
                {/* Mobile navigation toggle */}
                <div className="lg:hidden flex items-center ">
                  <button onClick={() => setToggleMenu(!toggleMenu)}>
                    <Bars3Icon className="h-6" />
                  </button>
                </div>
  
            </div>
          </div>
          {/* mobile navigation */}
          <div
            className={`fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12 origin-top ${toggleMenu ? "h-full" : "h-0"
              } transition-height duration-700`}
          >
            <div
              className={`px-8 transition-opacity ${toggleMenu ? "opacity-100 duration-500" : "opacity-0 duration-300"
                }`}
            >
              <div className="flex flex-col gap-8 font-semibold tracking-wider">
                <Link to={"/faculty/home"} className={`${location.pathname === '/faculty/home' ? 'border-l-4 border-gray-600 font-bold':'' }`}>
                  Home
                  </Link>
                <Link className={`hover:text-zinc-500 ${location.pathname === '/faculty/subjects' ? 'border-l-4 border-gray-600 font-bold':'' }`}>
                  Subjects
                  </Link>
                  <Link to={'/faculty/exam_subjects_schedule'} className={`hover:text-zinc-500 ${location.pathname === '/faculty/exam_subjects_schedule' ? 'border-l-4 border-gray-600 font-bold':'' }`}>
                    Examination
                    </Link>
                  <Link to={'/faculty/classes_incharge'} className={`hover:text-zinc-500 ${location.pathname === '/faculty/classes_incharge' ? 'border-l-4 border-gray-600 font-bold':'' }`}>
                    Class Incharge
                    </Link>
                  <div onClick={handleFacultySignout} className="hover:text-zinc-500 cursor-pointer">Logout</div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

}
export default NavbarCommon