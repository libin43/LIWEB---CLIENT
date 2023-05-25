import { useState } from "react";
import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dropdown } from 'flowbite-react'
import { Avatar } from 'flowbite-react'


import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearFacultyToken } from "../../redux/reducers/facultySlice";


function NavbarCommon() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleMenu, setToggleMenu] = useState(false);


  const handleFacultySignout = () => {
    console.log('fn called');
    dispatch(clearFacultyToken())
    navigate('/faculty/login');
  }



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
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="User settings"
                    className="w-16 h-16 rounded-full"
                  />
                }
              >
                <Dropdown.Header className="bg-white">
                  <span className="block text-sm"></span>
                  <span className="block truncate text-sm font-medium">
                    Libin Biji
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
export default NavbarCommon