import React,{useState} from 'react'
import {toast} from 'react-toastify'
import { useFacultyGetAcademicYearQuery, useFacultyGetClassByAcademicYearQuery, useFacultyGetStudentTotalExamResultsQuery, useFacultyPromoteStudentsMutation } from '../../../api/faculty/apiSlice';

const ClassOverallResult = ({classId}) => {
    const [showAcademicYear, setShowAcademicYear] = useState(false);
    const [yearQuery,setYearQuery] = useState(true);
    const [selectedYear, setSelectedYear] = useState('');
    const [classRoomQuery, setClassRoomQuery] = useState(true);
    const [selectedClass, setSelectedClass] = useState('');
    const [showMoveStudents, setShowMoveStudents] = useState(false);

    const toggleAcademicYear = () => {
    setYearQuery(false);
    setShowAcademicYear(!showAcademicYear);
    setSelectedClass('');
    };

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
    setClassRoomQuery(false);
  };


  const handleClassChange = (e) => {
    setSelectedClass(e.target.value)
    setShowMoveStudents(true)
  }

  const handlePromoteStudents = async (students, currentClassID) => {
    const data = {students,currentClassID,selectedClass}
    try{
        const res = await promoteStudents(data).unwrap()
    }
    catch(error) {
        console.log(error);
    }
  }

    const { data, isLoading, isError, error } = useFacultyGetStudentTotalExamResultsQuery(classId);
    const {data: academicYearData, isLoading: isFetchingAcademicYearData, isError: isAcademicYearFetchError, error: academicYearError} = useFacultyGetAcademicYearQuery(1,{skip: yearQuery});
    const {data: classRoomData, isLoading: isFetchingClassRoomData, isError: isClassRoomFetchError, error: classRoomError} = useFacultyGetClassByAcademicYearQuery(selectedYear,{skip: classRoomQuery});

    const [promoteStudents,{isLoading: isPromoteLoading}] = useFacultyPromoteStudentsMutation();

    if(isError || isAcademicYearFetchError || isClassRoomFetchError ){
        if(error?.status === 401 || academicYearError?.status === 401 || classRoomError?.status === 401){
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
    if (data) {
        // const eligibleStudents = data.inChargeClasses.filter((student) => student.percentage > 45);
        // const nonEligibleStudents = data.inChargeClasses.filter((student) => student.percentage <= 45);
        const studentsToShow = data.inChargeClasses;
        const studentsID = studentsToShow.map(students => students.studentID);


        return (
            <div className="p-4 md:p-16">
                <div className="overflow-x-auto">
                    <h3 className="text-center font-semibold mb-7">
                        Total Examination Marks
                    </h3>

                    <div>
                        <div className="btn mb-5">
                        {showMoveStudents ? ( // Render the "Move students" button conditionally
                            <button
                                className="ml-4 py-2 px-4 rounded bg-yellow-500 text-white"
                                onClick={()=> handlePromoteStudents(studentsID, classId)}
                            >
                                Move students
                            </button>
                        ) : (
                            <button
                                className="ml-4 py-2 px-4 rounded bg-blue-500 text-white"
                                onClick={toggleAcademicYear}
                            >
                                Click to view actions
                            </button>
                        )}
                        </div>
                        {
                            isFetchingAcademicYearData ?
                                <div role="status" className='flex justify-center items-center '>
                                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div> : ''
                        }
                        {showAcademicYear && academicYearData && (
                            <div className='mb-5'>
                                <label htmlFor="academic-year" className="mr-2">
                                    Next Academic Year:
                                </label>
                                <select
                                    id="academic-year"
                                    className='pl-5'
                                    value={selectedYear}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select academic year</option>
                                    {
                                        academicYearData.academicYear.map((academicYear, index) => {
                                            return (
                                                <option key={index} value={academicYear.id}>
                                                    {academicYear.startDate} - {academicYear.endDate}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        )}
                        {
                            isFetchingClassRoomData ?
                            <div role="status" className='flex justify-center items-center h-screen'>
                            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>:
                        ''
                        }
                        {classRoomData ? (
                            classRoomData.classes.length > 0 && (
                                <div className='mb-5'>
                                    <label htmlFor="class-selection" className="mr-2">
                                        Select a class to move:
                                    </label>
                                    <select id="class-selection"
                                    className='pl-5'
                                    value={selectedClass}
                                    onChange={handleClassChange}
                                    >
                                        <option value="" disabled>
                                            Select a class
                                        </option>
                                        {classRoomData.classes.map((classItem,index) => (
                                            <option key={index} value={classItem._id}>
                                                {classItem.className}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )
                        ) : (
                            ''
                        )}

                    </div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Sl No.</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Total Mark</th>
                                <th className="px-4 py-2 text-left">Mark Scored</th>
                                <th className="px-4 py-2 text-left">Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsToShow.map((student, index) => (
                                <tr
                                    key={index}
                                    className="border hover:bg-gray-100 transition-colors duration-300"
                                >
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{student.studentName}</td>
                                    <td className="border px-4 py-2">{student.totalExamMark}</td>
                                    <td className="border px-4 py-2">
                                        {student.totalExamObtainedMark}
                                    </td>
                                    <td
                                        className={`border px-4 py-2 ${student.percentage > 45 ? 'text-green-500' : 'text-red-500'
                                            }`}
                                    >
                                        {Math.round(student.percentage)} %
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default ClassOverallResult