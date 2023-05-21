import { useState } from "react";
import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearFacultyToken } from "../../redux/reducers/facultySlice";


function NavbarCommon() {
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
                  <span>Paper.io</span>
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
      <div className=" flex items-center gap-16 ">
        <button className="">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        </button>
        <div>Libin</div>
        <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-10 hidden">
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Profile
          </a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Settings
          </a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Logout
          </a>
        </div>
      </div>
            {/* secondary */}
            <div className="flex gap-6">
              <div className="hidden xs:flex items-center gap-10">
                <div className="hidden lg:flex items-center gap-2">
                  <MoonIcon className="h-6 w-6" />
                  <SunIcon className="h-6 w-6" />
                </div>
                <div>
                  <button className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-700 hover:text-gray-100">
                    Free Trial
                  </button>
                </div>
              </div>
               
              {/* Mobile navigation toggle */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  <Bars3Icon className="h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        <div
          className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
            !toggleMenu ? "h-0" : "h-full"
          }`}
        >
          <div className="px-8">
            <div className="flex flex-col gap-8 font-bold tracking-wider">
              <a href="#" className="border-l-4 border-gray-600">
                Features
              </a>
              <Link className="hover:text-zinc-500">Subjects</Link>
                <Link to={'/faculty/exam_subjects_schedule'} className="hover:text-zinc-500">Examination</Link>
                <Link to={'/faculty/classes_incharge'} className="hover:text-zinc-500">Class Incharge</Link>
                <div onClick={handleFacultySignout} className="hover:text-zinc-500 cursor-pointer">Logout</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default NavbarCommon