import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useFacultyGetExamConductedClassesQuery } from '../../../api/faculty/apiSlice';
import { setClassID } from '../../../redux/reducers/facultySlice';


const FacultyModal = (props) => {
    console.log('selected subject id in modal comp');
    const selectedSubjectID = props.selectedSubjectID
    const selectedExamID = props.selectedExamID
    const closeModal = props.onHideModal
    console.count(props);
    const [selectedClass, setSelectedClass] = useState({ classID: '', className: '' });
    const [isExamMarkExist, setIsExamMarkExist] = useState(false)
    const navigate = useNavigate();
    const handleClassSelect = (selectedClass) => {
        console.log(selectedClass.classID);
        setSelectedClass({ classID: selectedClass.classID, className: selectedClass.className });
        setIsExamMarkExist(selectedClass.examMarkPublished)
        console.log(selectedClass, 'its selected class');
     
    }
    const handleEnterMarks = () => {
        navigate(`/faculty/examination/exam_mark_input/students?className=${selectedClass.className}&classId=${selectedClass.classID}&subjectId=${selectedSubjectID}&examId=${selectedExamID}`)
    }

    const handleViewMarks = () => {
        console.log(selectedClass, 'submit called');
        navigate(`/faculty/examination/exam_mark_view/students?className=${selectedClass.className}&classId=${selectedClass.classID}&subjectId=${selectedSubjectID}&examId=${selectedExamID}`)
    }

    const handleModal = () => {
        closeModal();
    }
    const { data, isLoading, isFetching, isError, error } = useFacultyGetExamConductedClassesQuery({selectedSubjectID, selectedExamID});

    if (isLoading) {
        console.log(isLoading, 'loading classes modal');
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
    else if (isError) {
        console.log(error);
        if (error?.status === 401) {
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
            return (
                <Navigate to={'/faculty/login'} />
            )
        }
    }
    else if (data) {
        console.log(data, 'data in faculty modal');
        return (
            <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                {
                    isFetching ?
                        <div role="status" className='flex justify-center items-center h-screen'>
                            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div> :

                        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

                            <div className="modal-content py-4 text-left px-6">
                                <div className="flex justify-between items-center pb-3">
                                    <p className="text-2xl font-bold">Select a Class</p>
                                    <div className="modal-close cursor-pointer z-50" onClick={handleModal}>
                                        <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <path d="M18 1.8L16.2 0L9 7.2L1.8 0L0 1.8L7.2 9L0 16.2L1.8 18L9 10.8L16.2 18L18 16.2L10.8 9L18 1.8Z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="my-5">
                                    {data.classes.map((classes, index) =>
                                        <label key={classes._id} className="inline-flex items-center mr-5">
                                            <input type="checkbox" className="form-checkbox" checked={selectedClass.classID === classes._id} onChange={() => handleClassSelect({ classID: classes._id, className: classes.className, examMarkPublished : classes.examMarkEntered ?? false })} />
                                            <span className="ml-2">{classes.className}</span>
                                        </label>
                                    )}
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button className="modal-close px-4 bg-transparent p-3 rounded-lg text-cyan-950 hover:bg-gray-100 hover:text-indigo-400 mr-2" onClick={handleModal}>Cancel</button>
                                    {
                                        isExamMarkExist ?
                                    <button className={`px-4 bg-cyan-700 p-3 rounded-lg text-white hover:bg-cyan-950 ${selectedClass.classID ? '' : 'opacity-50 cursor-not-allowed'}`} onClick={handleViewMarks} disabled={!selectedClass.classID}>View Marks</button>
                                    :
                                    <button className={`px-4 bg-cyan-700 p-3 rounded-lg text-white hover:bg-cyan-950 ${selectedClass.classID ? '' : 'opacity-50 cursor-not-allowed'}`} onClick={handleEnterMarks} disabled={!selectedClass.classID}>Enter Marks</button>


                                    }
                                </div>
                            </div>
                        </div>

                }
            </div>
        )
    }
}

export default FacultyModal