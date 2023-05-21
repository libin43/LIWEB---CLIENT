import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaClipboardList } from 'react-icons/fa';
import { useAddExamMutation, useGetAcademicYearQuery, useGetSubjectByAcademicYearQuery } from '../../../api/schoolAdmin/apiSlice';
import { Spinner } from 'flowbite-react';
import { BiChevronDown } from "react-icons/bi";
import {toast} from 'react-toastify';

const AddExam = () => {
  const [skip, setSkip] = useState(true)
  const [selectedAcademicYear, setSeleclectedAcademicYear] = useState('')
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectSubjectError, setSelectSubjectError] = useState(false)
  const [open, setOpen] = useState(false);
  const {data: academicYearData, isLoading: isFetchingAcademicYearData, isError: isAcademicYearFetchError, error: academicYearError} = useGetAcademicYearQuery();
  const {data: subjectData, isLoading: isFetchingSubject, isError: isSubjectFetchError, error: subjectError} = useGetSubjectByAcademicYearQuery(selectedAcademicYear, {skip});
  const [addExam, {isLoading}] = useAddExamMutation();
  const {
    register,handleSubmit, formState: { errors }
} = useForm();
  const handleYearChange = (event) => {
    setSeleclectedAcademicYear(event.target.value);
    setSkip(false);
  }

  const onSubmit = async (data) => {
    if(selectedSubject===''){
        setSelectSubjectError(true)
        setTimeout(()=>{
            setSelectSubjectError(false)
        },100)
        return;
    }
    const exam = {...data, selectedSubject}
    console.log(selectedSubject,'selected subject');
    console.log(exam);
    try{
        const res = await addExam(exam).unwrap()
        console.log(res);
        if(res.success){
            toast.success(`Examination scheduled on ${res.exam.examDate}!`, {
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
    catch(error){
        console.log(error,'error in adding exam');
        if(error.status === 400){
            toast.error('Exam date must lie within selected academic year', {
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
            toast.error(`${error.data.error}`, {
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
  if(isFetchingAcademicYearData || isLoading){
    return(
    <div className="text-center">
    <Spinner aria-label="Center-aligned spinner example" />
    </div>
    )
  }
  else if(isAcademicYearFetchError){
    console.log(academicYearError, 'academic year fetch error in addexam');
  }

  else if(isSubjectFetchError){
    console.log(subjectError, 'subject fetch error in addexam');
  }

  else if(academicYearData){
    return (
        <div className='addExam'>
        <div className="m-3 ml-20 absolute inset-0 text-xl text-gray-900 font-semibold">
        <div className="p-4">
            <div className="p-4 border-2 border-gray-200 border-none rounded-lg dark:border-gray-700 mt-14">
            <div className="flex items-center mb-10">
                                <FaClipboardList className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <h5 className="ml-2">Add New Exam</h5>
                            </div>
                            <div className='p-4 border-2 border-gray-200 border-none rounded-lg dark:border-gray-700'>
                            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 dark:border-gray-600">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="exam_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Exam Name
                                    </label>
                                    <select
                                        id="exam_name"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.examName ? "shake" : ""}`}
                                        {...register('examName', {
                                            required: 'Exam name is required',
                                        })}
                                    >
                                        <option value="">Select exam name</option>
                                        <option value="MID TERM EXAM">MID TERM EXAM</option>
                                        <option value="TERM EXAM">TERM EXAM</option>
                                    </select>
                                    <p className="text-xs italic text-red-500">
                                        {errors.examName?.message}
                                    </p>
                                </div>

                        <div>
                            <label
                                htmlFor="exam_date"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                            >
                                Exam Date
                            </label>
                            <input
                                type="text"
                                id="exam_date"
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.examDate ? "shake" : ""}`}
                                {...register('examDate',{
                                  required: 'Date of exam is required',
                                  pattern:{
                                      value:/(^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/((19|20)\d{2})$)/,
                                      message:'Enter a valid date'
                                  },
                              })}
                                placeholder="dd/mm/yy"
                            />
                            <p className="text-xs italic text-red-500">
                                {errors.examDate?.message}
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
                                          htmlFor="subject_name"
                                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                      >
                                          Subject
                                      </label>
                                      {
                                        isFetchingSubject ?
                                        <div className="text-center">
                                        <Spinner aria-label="Center-aligned spinner example" />
                                        </div>
                                        :
                                            <div className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${selectSubjectError ? "shake" : ""}`}>
                                                <div
                                                    onClick={() => setOpen(!open)}
                                                    className={` dark:bg-stone-800 w-full mt-1 ml-1 text-white flex items-center justify-between ${!selectedSubject && "text-gray-700"
                                                        }`}
              
                                                >
                                                  
                                                    {selectedSubject
                                                        ? selectedSubject
                                                        : "Select Subject"}
                                                    <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
                                                </div>
                                                <ul
                                                    className={` dark:bg-stone-800 mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0"} `}
                                                >

                                                    {subjectData?.subject.map((subject, index) => (
                                                        <li
                                                            key={index}
                                                            className={`p-2 text-sm hover:bg-blue-500 hover:text-black`}
                                                            onClick={() => {
                                                                setSelectedSubject(subject.subjectCode);
                                                                setOpen(false);
                                                            }}
                                                        >
                                                            {subject?.subjectCode} - {subject?.subjectName}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                      }
                                      {
                                        selectSubjectError && (
                                            <p className="text-xs italic text-red-500">
                                                Please select subject.
                                            </p>
                                        )
                                      }
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
        </div>
    </div>
      )
  }

}

export default AddExam