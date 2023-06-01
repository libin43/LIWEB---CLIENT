import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify';
import { useFacultySubmitExamResultMutation } from '../../../api/faculty/apiSlice';
import { useNavigate } from 'react-router-dom';

const ExamScoreInputTable = ({ data }) => {
    const { classID, className, students } = data.studentsData
    const { _id: subjectID, subjectName } = data.subjectData
    const { _id: examID, examName } = data.examData

    const [totalMark, setTotalMark] = useState(100);
    const [scoreError, setScoreError] = useState({});
    const [resultSheet, setResultSheet] = useState([]);
    const [btnLoader, setBtnLoader] = useState(false);
    const navigate = useNavigate();

    const [addResult, {isLoading}] = useFacultySubmitExamResultMutation();

    useEffect(() => {
        setResultSheet((students).map((student) => ({ ...student, markObtained: null })))
    }, [students])

    const handleMarksChange = (id, value) => {
        if (parseInt(value) > totalMark || value === null) {
            setScoreError((prevScoreErrors) => ({
                ...prevScoreErrors,
                [id]: true
            }));
        } else {
            setScoreError((prevScoreErrors) => ({
                ...prevScoreErrors,
                [id]: false
            }));
        }
        setResultSheet((prevResultSheet) => {
            const updatedResultSheet = prevResultSheet.map((student) => {
                if (student._id === id) {
                    return { ...student, markObtained: parseInt(value) };
                }
                return student;
            });
            return updatedResultSheet;
        });
    };

    const handleSubmit = async () => {
        const hasScoreError = Object.values(scoreError).some((error) => error);
        const nullishMark = resultSheet.some((mark)=> mark.markObtained === null)
        if(hasScoreError || nullishMark){
            toast.error('Please enter valid score', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }
        const data = { classID, subjectID, examID, totalMark, resultSheet }
        try{
            setBtnLoader(true)
            const res = await addResult(data).unwrap();
            if(res?.success){
                setBtnLoader(false)
                toast.success(`${res?.message}`, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            navigate('/faculty/exam_subjects_schedule');
        }
        catch(error) {
            console.log(error,'error in score input');
             if(error?.status === 409){
                toast.error(`${error?.data?.error}`, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
        }
        finally {
            setBtnLoader(false);
        }
    }

    return (
        <div className="p-4 md:p-16">
            <div className="title text-center mb-10">
                <p><label htmlFor="exam_name" className='font-bold'>{examName}</label></p>
                <p>Subject : <label htmlFor="subject_name" className='font-semibold'>{subjectName}</label></p>
            </div>
            <div className="flex justify-between mb-4">
                <div className="w-1/4">
                    <p>Class: {className}</p>
                </div>
                <div className="flex items-center">
                    <label className='p-2 pt-1 pb-1' htmlFor="total_mark">Total Marks</label>
                    <select className="w-24 p-2 pt-1 pb-1 md:w-32"
                        onChange={(e) => setTotalMark(parseInt(e.target.value))}
                    >
                        <option value={100}>100</option>
                        <option value={50}>50</option>
                        <option value={25}>25</option>
                    </select>
                </div>
            </div>
            <table className="table-fixed w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="w-1/6 px-4 py-2 text-left">Sl No.</th>
                        <th className="w-1/2 px-4 py-2 text-left">Name</th>
                        <th className="w-1/4 px-4 py-2 text-left">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student._id} className="border hover:bg-gray-100 transition-colors duration-300">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{student.studentName}</td>
                            <td className="border px-4 py-2">
                                <input
                                    type="number"
                                    className="w-full"
                                    value={resultSheet.find((result) => result._id === student._id)?.markObtained || ''}
                                    onChange={(e) => handleMarksChange(student._id, e.target.value)}
                                />
                                {scoreError[student._id] && <div className='text-red-600 text-center'>Exceed Total Mark</div>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='text-center'>
            <button className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none" onClick={handleSubmit}>
                {btnLoader ?
                <div role="status">
                <svg aria-hidden="true" className="w-10 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>: 'Submit'
                }
            </button>
            </div>
        </div>
    );
}

export default ExamScoreInputTable