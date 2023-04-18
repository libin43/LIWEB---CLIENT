import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom'

const AddStudent = () => {
  const { 
    register,handleSubmit, watch, formState: { errors } 
} = useForm();

const onSubmit =  (data) => {   
    console.log('on sugmit called in studet');
    console.log(data);
}
  return (
    <div className='addStudent'>
    <div className="m-3 ml-20 absolute inset-0 text-xl text-gray-900 font-semibold">
    <div className="p-4">
        <div className="p-4 border-2 border-gray-200 border-none rounded-lg dark:border-gray-700 mt-14">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h5>Add Student</h5>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="student_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Student Name
                        </label>
                        <input
                            type="text"
                            id="student_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register('studentName',{
                              required: 'Name is required',
                              pattern:{
                                  value:/(^[^\s]+(\s[^\s]+)?(\s[^\s]+)?$)/,
                                  message:'Enter a valid name'
                              },
                              minLength:{
                                  value: 3,
                                  message:'Name must be 3 characters long'
                              },
              
                          })}
                            placeholder="Enter student name"
                        />
                        <p className="text-xs italic text-red-500">
                                 {errors.studentName?.message}
                        </p>
                    </div>
                    <div>
                        <label
                            htmlFor="parent_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Parent Name
                        </label>
                        <input
                            type="text"
                            id="parent_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register('parentName',{
                              required: 'Parent name is required',
                              pattern:{
                                  value:/(^[^\s]+(\s[^\s]+)?(\s[^\s]+)?$)/,
                                  message:'Enter a valid name'
                              },
                              minLength:{
                                  value: 3,
                                  message:'Name must be 3 characters long'
                              },
              
                          })}
                            placeholder="Enter parent name"
                        />
                         <p className="text-xs italic text-red-500">
                            {errors.parentName?.message}
                         </p>
                    </div>
                    
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Email ID
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register('email',{
                              required: 'Email is required',
                              pattern:{
                                  value:/(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)/,
                                  message:'Enter a valid Email ID'
                              }
              
                          })}
                            placeholder="Enter email"
                        />
                        <p className="text-xs italic text-red-500">
                            {errors.email?.message}
                         </p>
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Phone number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register('phone',{
                              required: 'Phone Number is required',
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
                        <p className="text-xs italic text-red-500">
                            {errors.phone?.message}
                         </p>
                    </div>
                    <div>
                        <label
                            htmlFor="date_of_birth"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            D.O.B
                        </label>
                        <input
                            type="text"
                            id="dob"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register('dob',{
                              required: 'Date of birth is required',
                              pattern:{
                                  value:/(^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/((19|20)\d{2})$)/,
                                  message:'Enter a valid date'
                              },
                          })}
                            placeholder="dd/mm/yy"
                        />
                        <p className="text-xs italic text-red-500">
                            {errors.dob?.message}
                         </p>
                    </div>
                    <div>
                        <label
                            htmlFor="date_of_birth"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Admission Date
                        </label>
                        <input
                            type="text"
                            id="dateOfJoin"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...register('dateOfJoin',{
                              required: 'Date of Join is required',
                              pattern:{
                                  value:/(^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/((19|20)\d{2})$)/,
                                  message:'Enter a valid date'
                              },
                          })}
                            placeholder="dd/mm/yy"
                        />
                        <p className="text-xs italic text-red-500">
                            {errors.dateOfJoin?.message}
                         </p>
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

export default AddStudent