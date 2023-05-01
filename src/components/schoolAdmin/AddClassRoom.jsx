import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom'
import { useAddClassMutation, useGetFacultyAcademicYearDropDownQuery } from '../../api/schoolAdmin/apiSlice';
import {toast} from 'react-toastify';

const AddClassRoom = () => {
    const {data, isLoading: isLoadingData, isError, error} = useGetFacultyAcademicYearDropDownQuery();
    const [addClass, {isLoading: isLoadingResponse}] = useAddClassMutation();
    const {
        register,handleSubmit, watch, formState: { errors } 
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log('on sugmit called in student');
        console.log(data);
        try{
            const res = await addClass(data).unwrap()
            console.log(res);
            if(res.success){
                toast.success('class room added!', {
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
        catch (error) {
            console.log(error);
            if(error.status === 409){
                toast.error('Class-room already exists!', {
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
        console.log(error,'in addclassroom');
        localStorage.removeItem('schoolAdminToken');
        navigate('/school_admin/login');
    }
    else if(data){
        console.log(data, 'add classroom');
        return (
            <div className='addClassRoom'>
                <div className="m-3 ml-20 absolute inset-0 text-xl text-gray-900 font-semibold">
                  <div className="p-4">
                      <div className="p-4 border-2 border-gray-200 border-none rounded-lg dark:border-gray-700 mt-14">
                          <div className='p-4 border-2 border-gray-200 border-none rounded-lg dark:border-gray-700 mt-14'>
                            <svg aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
        
                        <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                      </svg>
                      {
                    <form onSubmit={handleSubmit(onSubmit)}>
                            <h5>Add Classrooms</h5> 
                              <div className="grid gap-6 mb-6 md:grid-cols-3">
                                  <div>
                                      <label
                                          htmlFor="class_name"
                                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                      >
                                          Class
                                      </label>
                                      <input
                                          type="text"
                                          id="class_name"
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          {...register('className',{
                                            required: 'Class is required',
                                            pattern:{
                                                value:/(^[0-9]{1,2} [A-Z]$)/,
                                                message:'Enter a valid class'
                                            },
                                        })}
                                          placeholder="Enter class name"
                                      />
                                       <p className="text-xs italic text-red-500">
                                         {errors.className?.message}
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
                                                    className="text-white bg-blue-700 dark:hover:bg-gray-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-4 py-2.5  inline-flex items-center dark:bg-stone-800 dark:border-gray-600 dark:focus:ring-blue-500"
                                                    {...register('academicYearID', {
                                                        required: true,
                                                    })}
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
                                                      htmlFor="faculty_incharge"
                                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                                  >
                                                      Faculty Incharge
                                                  </label>
                                                  <select
                                                      id="faculty_incharge"
                                                      defaultValue=""
                                                      className="text-white bg-blue-700 dark:hover:bg-gray-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-4 py-2.5  inline-flex items-center dark:bg-stone-800 dark:border-gray-600 dark:focus:ring-blue-500"
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
                      }
                          </div>
                      </div>
                  </div>
                  </div>
              </div>
          )
    }
    
}

export default AddClassRoom