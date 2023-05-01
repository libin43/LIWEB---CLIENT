import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { useAddSubjectMutation,useGetClassByAcademicYearMutation , useGetFacultyAcademicYearDropDownQuery } from '../../api/schoolAdmin/apiSlice';
import { useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { Spinner } from 'flowbite-react';
import {toast} from 'react-toastify';

const AddSubject = () => {
    const [classRoom, setClassRoom] = useState([])
    const [selectedClass, setSelectedClass] = useState([])
    const [selectClassError,setSelectClassError] = useState(false)
    const {data, isLoading: isLoadingData, isError, error} = useGetFacultyAcademicYearDropDownQuery();
    const [fetchClass,{isLoading: isFetchingClasses}] = useGetClassByAcademicYearMutation();
    const [addSubject, {isLoading: isLoadingResponse}] = useAddSubjectMutation();
    const navigate = useNavigate();
    const { 
        register,handleSubmit, watch, formState: { errors }
    } = useForm();

    const handleYearChange = async (event) => {
        const data = {academicYearID: event.target.value}
        try{
            const res = await fetchClass(data).unwrap();
            if(res.success){
                console.log(res);
                setClassRoom(res.classRoom)
                console.log(classRoom, 'class fetch success');
            }
        }
        catch (error) {
            console.log(error);
            if(error.status === 401){
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
    }

    if(Object.keys(errors).length!=0) {
        if ('vibrate' in navigator) {
            window.navigator.vibrate(1000)
            console.log('vibration is there');
          } else {
           console.log('no vibration');
          }
    }
    const onSubmit = async (data) => {
        if(selectedClass.length === 0){
            setSelectClassError(true)
            setTimeout(()=>{
                setSelectClassError(false)
            },1000)
            return;
        }
        const subject = {...data,selectedClass}
        try{
            const res = await addSubject(subject).unwrap()
            console.log(res);
        }
        catch (error) {
            console.log(error);
            if(error.status === 401){
                toast.warn('Unauthorized Access', {
                    position: "bottom-center",
                    autoClose: 1000,
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
            else if(error.status === 404){
                toast.error(error.data.error, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            else if(error.status === 409){
                toast.error('Subject already exists!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
        }
    }

    if(isLoadingData || isLoadingResponse){
        return(
            <div>
                <div role="status" className='flex justify-center items-center h-screen'>
                <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            </div>
        )
    }
    else if(isError){
        console.log(error,'in add subject');
        localStorage.removeItem('schoolAdminToken');
        navigate('/school_admin/login');
    }
    else if (data){
        return (
            <div className='addSubject'>
              <div className="m-3 ml-20 absolute inset-0 text-xl text-gray-900 font-semibold">
      
                <div className="p-4 ">
                            <div className="p-4 border-2 border-gray-200 border-none rounded-lg dark:border-gray-700 mt-14">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <h5>Add Subject</h5>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="subject_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Subject Name
                                    </label>
                                    <input
                                        type="text"
                                        id="subject_name"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.subjectName ? "shake" : ""}`}
                                        {...register('subjectName',{
                                          required: 'Subject name is required',
                                          pattern:{
                                              value:/(^[^\s]+(\s[^\s]+)?(\s[^\s]+)?$)/,
                                              message:'Enter a valid subject name'
                                          },
                                          minLength:{
                                              value: 3,
                                              message:'Name must be 3 characters long'
                                          },
                          
                                      })}
                                        placeholder="Enter subject name"
                                    />
                                     <p className="text-xs italic text-red-500">
                                       {errors.subjectName?.message}
                                     </p>
                                </div>
                                <div>
                                    <label
                                        htmlFor="subject_code"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Subject Code
                                    </label>
                                    <input
                                        type="text"
                                        id="subject_code"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.subjectCode ? "shake" : ""}`}
                                        {...register('subjectCode',{
                                          required: 'Subject code is required',
                                          pattern:{
                                              value:/((?<![ ])[A-Z]{2}[0-9]{3}$)/,
                                              message:'Enter a valid subject code'
                                          },
                                          minLength:{
                                              value: 3,
                                              message:'Name must be 3 characters long'
                                          },
                          
                                      })}
                                        placeholder="Enter subject code eg: SS010"
                                    />
                                     <p className="text-xs italic text-red-500">
                                       {errors.subjectCode?.message}
                                     </p>
                                </div>
                                <div>
                                                    <label
                                                        htmlFor="academic_year"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                                    >
                                                        Academic Year
                                                    </label>
                                                    <select
                                                        id="academic_year"
                                                        defaultValue=""
                                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.academicYearID ? "shake" : ""}`}
                                                        {...register('academicYearID', {
                                                            required: true,
                                                        })}
                                                        onChange={handleYearChange}
                                                    >
                                                        <option value="" disabled>Select academic year</option>
                                                        {
                                                            data.academicYear.map((academicYear, index) => {
                                                                return (
                                                                    <option key={index} value={academicYear.id}>
                                                                        {academicYear.startDate} - {academicYear.endDate}
                                                                    </option>
                                                                )
    
                                                            })
                                                        }
                                                    </select>
                                                    {errors.academicYearID && (
                                                        <p className="text-xs italic text-red-500">
                                                            Please select academic year.
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                      <label
                                          htmlFor="class_name"
                                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                      >
                                          Class Room
                                      </label>
                                      {
                                        isFetchingClasses ?
                                        <div className="text-center">
                                        <Spinner aria-label="Center-aligned spinner example" />
                                        </div>
                                        :
                                        <Multiselect
                                        className={`${selectClassError?'shake': ''}`}
                                        isObject = {false}
                                        options = {classRoom.map(room => room.className)}
                                        showCheckbox
                                        onRemove={(e) => setSelectedClass(e)}
                                        onSelect={(e) => setSelectedClass(e)}
                                        showArrow
                                        style={{
                                          searchBox: {
                                            fontSize: "0.875rem",
                                            minHeight: "1.875rem",
                                            backgroundColor: "#292524",
                                            borderRadius: "10px"
                                          },
                                          inputField: {
                                            margin: "0.01rem",
                                            height: "1.5rem"
                                          },
                                          chips: {
                                            backgroundColor: "#9ca3af",
                                            color:'#000000',
                                            borderRadius: "0.375rem",
                                            margin: "0.25rem",
                                            padding: "0.25rem 0.5rem",
                                          },
                                          optionContainer: {
                                            backgroundColor: "#F7FAFC",
                                            border: "1px solid #E5E7EB",
                                            borderRadius: "0.375rem",
                                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                            marginTop: "0.25rem",
                                          },
                                          option: {
                                            color: "#1A202C",
                                            padding: "0.015rem",
                                            cursor: "pointer",
                                          },
                                          groupHeading: {
                                            backgroundColor: "#E2E8F0",
                                            padding: "0.5rem",
                                          },
                                        }}
                                        />
                                      }

                                      
                                          <p className="text-xs italic text-red-500">
                                              {selectClassError ? "Please Select Classes" : ""}
                                          </p>
                                  
                                  </div>
            
                                                  <div> 
                                                      <label
                                                          htmlFor="faculty_incharge"
                                                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                                      >
                                                          Faculty Incharge
                                                      </label>
                                                      <select
                                                          id="faculty_incharge"
                                                          defaultValue=""
                                                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.facultyID ? "shake" : ""}`}
                                                          {...register('facultyID',{
                                                            required: true, 
                                                          })}
                                                      >
                                                          <option value="" disabled>Select your faculty</option>
                                                          {
                                                            data.facultyName.map((faculty,index) => {
                                                                return(
                                                                    <option key={index} value={faculty._id}>
                                                                      {faculty.facultyName}
                                                                    </option>
                                                                )
                                                               
                                                            })
                                                          }
                                                      </select>
                                                      {errors.facultyID && (
                                                          <p className="text-xs italic text-red-500">
                                                              Please select a faculty incharge.
                                                          </p>
                                                      )}
                                                  </div>
                                
                            </div>
                            <div className='flex flex-col items-center'>
                            <button
                                type="submit"
                                className="mx-auto mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:max-w-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                            </div>
                        </form>
      
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default AddSubject