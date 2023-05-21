import React,{useState} from 'react'
import { useFacultyGetAcademicYearQuery, useFacultyGetClassByAcademicYearQuery, useFacultyGetStudentTotalExamResultsQuery, useFacultyPromoteStudentsMutation } from '../../../api/faculty/apiSlice';

const ClassOverallResult = ({classId}) => {
    console.count(classId, 'in class overall comp');
    const [showAcademicYear, setShowAcademicYear] = useState(false);
    const [yearQuery,setYearQuery] = useState(true);
    const [selectedYear, setSelectedYear] = useState('');
    const [classRoomQuery, setClassRoomQuery] = useState(true)
    const [selectedClass, setSelectedClass] = useState('');
    const [showMoveStudents, setShowMoveStudents] = useState(false);


    const toggleAcademicYear = () => {
    setYearQuery(false);
    setShowAcademicYear(!showAcademicYear);
    setSelectedClass('');
    };

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Set the next academic year
  const nextAcademicYear = `${currentYear}-${currentYear + 1}`;

  // Set the available classes for the next academic year
  const classesForNextAcademicYear = ['Class 1', 'Class 2', 'Class 3'];

  const handleChange = (event) => {
    console.log(event.target.value,'vaue of year');
    setSelectedYear(event.target.value);
    setClassRoomQuery(false);
  };

  const handleYearSelection = () => {

  };

  const handleClassChange = (e) => {
    console.log(e.target.value,'alert called');
    setSelectedClass(e.target.value)
    setShowMoveStudents(true)
  }

  const handlePromoteStudents = async (students, currentClassID) => {
    const data = {students,currentClassID,selectedClass}
    console.log(data)
    try{
        const res = await promoteStudents(data).unwrap()
        console.log(res);
    }
    catch(error) {
        console.log(error);
    }
  }

    const { data, isLoading, isError, error } = useFacultyGetStudentTotalExamResultsQuery(classId);
    const {data: academicYearData, isLoading: isFetchingAcademicYearData, isError: isAcademicYearFetchError, error: academicYearError} = useFacultyGetAcademicYearQuery(1,{skip: yearQuery});
    const {data: classRoomData, isLoading: isFetchingClassRoomData, isError: isClassRoomFetchError, error: classRoomError} = useFacultyGetClassByAcademicYearQuery(selectedYear,{skip: classRoomQuery});

    const [promoteStudents,{isLoading: isPromoteLoading}] = useFacultyPromoteStudentsMutation();


if(classRoomData){
    console.log(classRoomData);
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
                                    onBlur={handleYearSelection}
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