import React, { useState } from 'react'
import { Card } from 'flowbite-react';
import { Navigate, Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useFacultyGetExamScheduleQuery } from '../../../api/faculty/apiSlice';
import FacultyModal from '../modal/FacultyModal';


const FacultyExamSchedule = ({selectedYearID}) => {
    console.count('faculty card loaded');
    console.log(selectedYearID,'faculty card loaded');
    const [showModal, setShowModal] = useState(false);
    const [selectedSubjectID, setSelectedSubjectID] = useState(null);
    const [selectedExamID, setSelectedExamID] = useState(null);
    const {data, isLoading, isError, error} = useFacultyGetExamScheduleQuery(selectedYearID);
    if(isLoading){
        return (
            <div role="status" className='flex justify-center items-center h-screen'>
            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
        )
    }
    else if(isError){
        console.log(error);
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
                localStorage.removeItem('facultyToken');
                return(
                  <Navigate to={'/faculty/login'}/>
                )
        }
    }
    else if(data){
        console.log(data, 'data in faculty card');
        if (data?.subjects !== null) {
            console.log(data.subjects);
            //format date
            const formatDate = (date) => {
                const day = date.getDate();
                const month = date.toLocaleString('default', { month: 'long' });
                const year = date.getFullYear();
                return `${day} ${month} ${year}`;
              };
            const examScheduledSubjects = data.subjects.filter((subjects) => subjects.examID).map((subjects) => {
                const formattedDate = formatDate(new Date(subjects.examDate));
                return { ...subjects, examDateFormatted: formattedDate };
            })
            console.log(examScheduledSubjects, 'exam scheduleed');
            const examNotScheduledSubjects = data.subjects.filter((subjects) => !subjects.examID);
            console.log(examNotScheduledSubjects, 'not scheduled');
            const todayDate = new Date();

            const submitSubjectID = (subjectID, examID) => {
                console.log(subjectID,'faunction called');
                setSelectedSubjectID(subjectID);
                setSelectedExamID(examID);
                setShowModal(true);
            }

            const handleCloseModal = () => {
                setShowModal(false);
            }

            return (
                <>
                    {examScheduledSubjects.length !== 0 &&
                        <>
                            <h3 className='pl-10'>Examination Scheduled</h3>
                            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {
                                    examScheduledSubjects.map((subjects, index) =>
                                    <div className="max-w-xs relative group">
                                    <Card key={index}>
                                      <div className="mb-2 group-hover:blur-sm">
                                      <div className="mt-2.5 mb-5 flex items-center">
                                          <h5 className="font-semibold tracking-tight text-gray-900 dark:text-white">
                                            Exam Name: {subjects.examName}
                                          </h5>
                                        </div>
                                        <div className="mt-2.5 mb-5 flex items-center">
                                          <h5 className="font-semibold tracking-tight text-gray-900 dark:text-white">
                                            Subject Code: {subjects.subjectCode}
                                          </h5>
                                        </div>
                                        <div className="mt-2.5 mb-5 flex items-center">
                                          <h5 className="font-semibold tracking-tight text-gray-900 dark:text-white">
                                            Subject Name: {subjects.subjectName}
                                          </h5>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-xl text-gray-900 dark:text-white">
                                            Date : {subjects.examDateFormatted}
                                          </span>
                                        </div>
                                      </div>
                                    </Card>
                                    {
                                        new Date(subjects.examDate) < todayDate ?
                                        <div className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 group-hover:opacity-100">
                                      <Link
                                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={() => submitSubjectID(subjects.subjectID,subjects.examID)}
                                      >
                                        View Classes
                                      </Link>
                                    </div>
                                    :
                                    <div className="text-white opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 group-hover:opacity-100">
                                    Upcoming exam
                                  </div>
                                    }
                                  </div>
                                  
                                    )
                                }
                            </div>
                        </>
                    }
                    {
                        examNotScheduledSubjects.length !== 0 &&
                        <>
                            <h3 className='pl-10'>Examination Not Scheduled</h3>
                            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {
                                    examNotScheduledSubjects.map((subjects, index) =>
                                    <div className="max-w-xs relative group">
                                    <Card>
                                      <div className="mb-2 group-hover:blur-sm">
                                        <div className="mt-2.5 mb-5 flex items-center">
                                          <h5 className="font-semibold tracking-tight text-gray-900 dark:text-white">
                                            Subject Code: {subjects.subjectCode}
                                          </h5>
                                        </div>
                                        <div className="mt-2.5 mb-5 flex items-center">
                                          <h5 className="font-semibold tracking-tight text-gray-900 dark:text-white">
                                            Subject Name: {subjects.subjectName}
                                          </h5>
                                        </div>
                                      </div>
                                    </Card>
                                    <div className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 group-hover:opacity-100 text-white font-semibold">
                                        Scheduling Exam Soon!
                                    </div>
                                  </div>
                                    )
                                }
                            </div>
                        </>
                    }
                    {
                        showModal && (
                            <FacultyModal selectedSubjectID = {selectedSubjectID} selectedExamID = {selectedExamID} onHideModal = {handleCloseModal} />
                        )
                    }
                </>
            )
        }
        else if(data.subjects === null) {
            return(
                <h5 className="text-xl font-semibold tracking-tight text-red-600 text-center mt-16">
                You are not assigned any subjects to teach
              </h5>   
            )
        }

    }
}

export default FacultyExamSchedule