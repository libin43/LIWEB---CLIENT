import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom'
import { useAddStudentMutation, useGetAcademicYearQuery, useGetClassByAcademicYearQuery } from '../../../api/schoolAdmin/apiSlice';
import {toast} from 'react-toastify';

const AddStudent = () => {
    const [skip, setSkip] = useState(true)
    const [academicYearID, setAcademicYearID] = useState(null)
    const [classRoom, setClassRoom] = useState([])
    const {data:academicYearData, isLoading: isLoadingAcademicYearData, isError:isAcademicYearError, error: academicYearError} = useGetAcademicYearQuery();
    const {data: fetchClass, isLoading: isFetchingClasses, isError: isFetchClassError, error: classError} = useGetClassByAcademicYearQuery(academicYearID,{skip});

    const [addStudent, {isLoading}] = useAddStudentMutation();
    const navigate = useNavigate()
  const { 
    register,handleSubmit, formState: { errors } 
} = useForm();
const handleYearChange = async (event) => {
    setAcademicYearID(event.target.value)
    setSkip(false)
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
    console.log('on sugmit called in studet');
    console.log(data);
    try{
        const res = await addStudent(data).unwrap();
        console.log(res);
        if(res.success){
            toast.success(res.message, {
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
        if(error.status === 401){
            console.log('toast in addstudent calling');
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
        else if(error.status === 409) {
            toast.error('Student already exists!', {
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

if(isLoadingAcademicYearData){
    return(
            <div role="status" className='flex justify-center items-center h-screen'>
            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

else if(isAcademicYearError || isFetchClassError){
    console.log(academicYearError,'Academic year fetch error');
    console.log(classError,'Class fetch error');
    if(academicYearError?.status === 401 || classError?.status === 401){
        console.log('toast in addstudent calling');
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

else if(isFetchClassError){
    console.log(classError,'Academic year fetch error');
    if(classError.status === 401){
        console.log('toast in addstudent calling');
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

else if(fetchClass){
    setSkip(true)
    console.log(fetchClass,'class fetch in addStudent');
    if(fetchClass?.success){
        setClassRoom(fetchClass.classRoom)
    }
}

else if(academicYearData || classRoom.length!=0){
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
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.studentName ? "shake" : ""}`}
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
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.parentName ? "shake" : ""}`}
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
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email ? "shake" : ""}`}
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
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.phone ? "shake" : ""}`}
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
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.dateOfBirth ? "shake" : ""}`}
                                {...register('dateOfBirth',{
                                  required: 'Date of birth is required',
                                  pattern:{
                                      value:/(^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/((19|20)\d{2})$)/,
                                      message:'Enter a valid date'
                                  },
                              })}
                                placeholder="dd/mm/yy"
                            />
                            <p className="text-xs italic text-red-500">
                                {errors.dateOfBirth?.message}
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
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.dateOfJoin ? "shake" : ""}`}
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
                        <div>
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.address ? "shake" : ""}`}
                                {...register('address',{
                                  required: 'Address is required',
                              })}
                                placeholder="Enter address"
                            />
                            <p className="text-xs italic text-red-500">
                                {errors.address?.message}
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
                                              academicYearData?.academicYear.map((academicYear, index) => {
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
                                      <select
                                          id="class_name"
                                          defaultValue=""
                                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.className ? "shake" : ""}`}
                                          {...register('className', {
                                              required: true,
                                          })}
                                      >
                                          <option value="" disabled>Select class room</option>
                                          {
                                             classRoom.map((classRoom, index) => {
                                                return (
                                                    <option key={index} value={classRoom.className}>
                                                        {classRoom.className}
                                                    </option>
                                                )
    
                                            })
                                          }
                                      </select>
                                      {errors.className && (
                                          <p className="text-xs italic text-red-500">
                                              Please select class room.
                                          </p>
                                      )}
                                  </div>
                    </div>
                    
                    <div className='flex flex-col items-center'>
                        {
                            isFetchingClasses ?
                                        <div role="status" className='flex justify-center items-center h-screen'>
                                            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                            :
                                        <button
                                            type="submit"
                                            className="mx-auto mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:max-w-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Submit
                                        </button>
                        }
                    </div>
                </form>
    
            </div>
        </div>
        </div>
    </div>
      )
}

}

export default AddStudent