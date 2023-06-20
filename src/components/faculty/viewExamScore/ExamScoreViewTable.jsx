import React from 'react'

const ExamScoreViewTable = ({data}) => {
    const { _id: classID, className, status } = data.classData
    const { _id: examID, examName } = data.examData
    const { _id: subjectID, subjectName, subjectCode } = data.subjectData
    const {totalMark} = data.totalSubjectMark
    const subjectResult = data.subjectResultSheet


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
            <span>{totalMark}</span>
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
            {subjectResult.map((student, index) => (
                <tr key={index} className="border hover:bg-gray-100 transition-colors duration-300">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{student.studentName}</td>
                    <td className="border px-4 py-2">{student.examMarkObtained}</td>
                </tr>
            ))}
        </tbody>
    </table>
    <div className='text-center'>
    </div>
</div>
  )
}

export default ExamScoreViewTable