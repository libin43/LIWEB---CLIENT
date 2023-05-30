import React from 'react'
import { Spinner } from 'flowbite-react';
import {toast} from 'react-toastify';
import { BiChevronDown } from "react-icons/bi";

const AcademicYearDropDown = ({data, isLoading, isError, error, handleYearChange, setYearDropDown, yearDropDown, selectedAcademicYear}) => {
    if(isLoading){
        return (
        <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
        </div>
        )
    }
    else if(isError){
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
                localStorage.removeItem('schoolAdminToken');
                navigate('/school_admin/login')
        }
    }
    else if(data){
        console.log(selectedAcademicYear, 'selected year comp');
        return (
            <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 mb-6 md:w-1/2 w-full dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <div
                    onClick={() => setYearDropDown(!yearDropDown)}
                    className={` dark:bg-stone-800 w-full mt-1 ml-1 text-white flex items-center justify-between ${!selectedAcademicYear && "text-gray-700"}`}

                >

                    {selectedAcademicYear.startDate && selectedAcademicYear.endDate
                        ? `${selectedAcademicYear?.startDate} - ${selectedAcademicYear?.endDate}`
                        : "Select Academic Year"}
                    <BiChevronDown size={20} className={`${yearDropDown && "rotate-180"}`} />
                </div>
                <ul
                    className={` dark:bg-stone-800 mt-2 overflow-y-auto ${yearDropDown ? "max-h-24" : "max-h-0"} `}
                >

                    {data?.academicYear.map((academicYear, index) => (
                        <li
                            key={index}
                            className={`p-2 text-sm hover:bg-blue-500 hover:text-black`}
                            onClick={() => handleYearChange(academicYear)}
                        >
                            {academicYear?.startDate} - {academicYear?.endDate}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}

export default AcademicYearDropDown