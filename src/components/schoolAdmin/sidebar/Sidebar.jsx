import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { MdEventNote } from 'react-icons/md';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { BiChalkboard } from 'react-icons/bi';
import { FaUserGraduate } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Home = () => {
  const menus = [
    { name: "Dashboard", link: "/school_admin/dashboard", icon: MdOutlineDashboard },
    { name: "Academic Year Management", link: "/school_admin/addAcademicYear", icon: MdEventNote },
    { name: "Faculty Management", link: "/school_admin/addFaculty", icon: FaChalkboardTeacher },
    { name: "Classroom Management", link: "/school_admin/addClassroom", icon: BiChalkboard, margin: true },
    { name: "Student Management", link: "/school_admin/get_all_student", icon: FaUserGraduate },
    { name: "Subject Management", link: "/school_admin/get_subject", icon: FaBookOpen },
    { name: "Exam Management", link: "/school_admin/add_exam", icon: FaClipboardList },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div>
    <section className="flex gap-2">
      <div
        className={`bg-[#0e0e0e] min-h-screen fixed ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4 z-10`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md `}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                }  absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
     
    </section>
     
   </div>
  );
};

export default Home;