import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom'

const AddClassRoom = () => {
    const { 
        register,handleSubmit, watch, formState: { errors } 
    } = useForm();
    
    const onSubmit =  (data) => {   
        console.log('on sugmit called in studet');
        console.log(data);
    }
  return (
    <div className='addClassRoom'>
          <div className="p-4 sm:ml-64">
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Add Classrooms</h5> 
                      <div className="grid gap-6 mb-6 md:grid-cols-2">
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
                                        value:/(^\d{1,2}$)/,
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
                                  htmlFor="section_name"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                              >
                                  Section
                              </label>
                              <input
                                  type="text"
                                  id="section_name"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  {...register('sectionName',{
                                    required: 'Section is required',
                                    pattern:{
                                        value:/(^[A-Z]+$)/,
                                        message:'Enter a valid section name'
                                    }
                    
                                })}
                                  placeholder="Enter section name  [A-Z]"
                              />
                              <p className="text-xs italic text-red-500">
                                 {errors.sectionName?.message}
                               </p>
                          </div>
                          <div>
                              <label
                                  htmlFor="faculty_incharge"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                              >
                                  Faculty Incharge
                              </label>
                              <input
                                  type="text"
                                  id="faculty"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  {...register('facultyIncharge',{
                                    required: 'Faculty is required',
                                    pattern:{
                                        value:/(^[+]?[0-9]{1,3}?[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{4}$)/,
                                        message:'Enter a valid phone number'
                                    },
                                    minLength:{
                                        value: 10,
                                        message:'Enter 10 digits'
                                    },
                                    maxLength:{
                                        value: 10,
                                        message:'phone number exceeds 10 digits'
                                    }
                    
                                })}
                                  placeholder="Enter mobile number"
                              />
                          </div>
                          <div>
                              <label
                                  htmlFor="academic_year"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                              >
                                  Academic Year
                              </label>
                              <input
                                  type="text"
                                  id="academicYear"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  {...register('academicYear',{
                                    required: 'Academic year is required',
                                    pattern:{
                                        value:/(^[+]?[0-9]{1,3}?[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{4}$)/,
                                        message:'Enter a valid date'
                                    },
                                })}
                                  placeholder="dd/mm/yy"
                              />
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

export default AddClassRoom