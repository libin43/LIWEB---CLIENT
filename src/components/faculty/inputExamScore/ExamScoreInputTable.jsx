import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify';
import { useFacultySubmitExamResultMutation } from '../../../api/faculty/apiSlice';
import { useNavigate } from 'react-router-dom';

const ExamScoreInputTable = ({ data }) => {
    const { classID, className, students } = data.studentsData
    const { _id: subjectID, subjectName } = data.subjectData
    const { _id: examID, examName } = data.examData
    console.log(students,'sku');

    const [totalMark, setTotalMark] = useState(100);
    const [scoreError, setScoreError] = useState({});
    const [resultSheet, setResultSheet] = useState([]);
    const navigate = useNavigate();

    const [addResult, {isLoading}] = useFacultySubmitExamResultMutation();


    useEffect(() => {
        setResultSheet((students).map((student) => ({ ...student, markObtained: 0 })))
    }, [students])

    const handleMarksChange = (id, value) => {
        console.log(value,'hai');
        if (parseInt(value) > totalMark || value === '') {
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
        console.log(hasScoreError,'has');
        if(hasScoreError){
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
        console.log(data,'finale');
        try{
            const res = await addResult(data).unwrap();
            console.log(res);
            if(res?.success){
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
            // navigate('/faculty/home');
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
            <button className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}

export default ExamScoreInputTable