import React from 'react'
import { Spinner } from 'flowbite-react';
import { BiChevronDown } from "react-icons/bi";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ClassDropDown = ({data, isLoading, isError, error, handleClassChange, setClassDropDown, classDropDown, selectedClassId, selectedClassName}) => {
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
        return (
            <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 mb-6 md:w-1/2 w-full dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <div
                        onClick={() => setClassDropDown(!classDropDown)}
                        className={` dark:bg-stone-800 w-full mt-1 ml-1 text-white flex items-center justify-between ${!selectedClassId && "text-gray-700"
                            }`}
                    > 
                        {selectedClassName ? selectedClassName : "Select Class"}
                        <BiChevronDown size={20} className={`${classDropDown && "rotate-180"}`} />
                    </div>
                    <ul
                        className={` dark:bg-stone-800 mt-2 overflow-y-auto ${classDropDown ? "max-h-32" : "max-h-0"} `}
                    >
                        {
                            data?.classRoom.length ===0 ?
                            (<Link to='/school_admin/addClassRoom'>
                            <li className={`p-2 text-sm hover:bg-blue-500 hover:text-black`}>Add Class</li>
                            </Link>)
                            :
                            (data?.classRoom.map((classRoom, index) => (
                                <li
                                    key={index}
                                    className={`p-2 text-sm hover:bg-blue-500 hover:text-black`}
                                    onClick={() => handleClassChange(classRoom)}
                                >
                                    {classRoom?.className}
                                </li>
                            )))
                        }
                    </ul>
                </div>
          )
    }

}

export default ClassDropDown