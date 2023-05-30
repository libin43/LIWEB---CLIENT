import React, { useState } from 'react'
import AcademicYearDropDown from '../academicYearDropDown/AcademicYearDropDown';
import { useGetAcademicYearQuery, useGetClassByAcademicYearQuery, useGetSubjectsByClassQuery } from '../../../api/schoolAdmin/apiSlice'
import ClassDropDown from '../classDropDown/ClassDropDown';
import AdminTable from '../tables/AdminTable';
import { Table, Button } from 'flowbite-react'
import { Link } from 'react-router-dom';

const GetSubject = () => {
    //academic-year
    const [yearDropDown, setYearDropDown] = useState(false);
    const [selectedAcademicYear, setSelectedAcademicYear] = useState({startDate:'',endDate:''});
    const [selectedAcademicYearID, setSelectedAcademicYearID] = useState(null);
    const handleYearChange = (academicYear) =>{
        console.log(academicYear,'year changed................');
        setSelectedAcademicYear({ startDate: academicYear.startDate, endDate: academicYear.endDate });
        setSelectedAcademicYearID(academicYear.id);
        console.log(selectedAcademicYear);
        setYearDropDown(false)
        setClassQuery(false);
    }
    const {data: academicYearData, isLoading: isFetchingAcademicYearData, isError: isAcademicYearFetchError, error: academicYearError} = useGetAcademicYearQuery();
    //classroom
    const [selectedClassID, setSelectedClassID] = useState(null);
    const [selectedClassName, setSelectedClassName] = useState(null);
    const [classDropDown,setClassDropDown] = useState(false);
    const [classQuery, setClassQuery] = useState(true);
    const handleClassChange = (classRoom) =>{
        console.log(classRoom,'classRoom changed');
        setSelectedClassID(classRoom._id);
        setSelectedClassName(classRoom.className);
        setClassDropDown(false);
        setSubjectQuery(false);
    }
    const {data: classData, isLoading: isFetchingClasses, isError: isFetchClassError, error: classError} = useGetClassByAcademicYearQuery(selectedAcademicYearID,{skip: classQuery});

    //pagination
    const [subjectQuery, setSubjectQuery] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
const {data: subjectData, isLoading: isFetchingSubjects, isError: isFetchSubjectError, error: subjectError} = useGetSubjectsByClassQuery({selectedClassID, currentPage, itemsPerPage:5},{skip: subjectQuery});
    return (
        <div className='getSubject'>
            <div className="m-3 ml-20 absolute inset-0 text-xl text-gray-900 font-semibold">
                <div className="p-4 ">
                    <div className="p-4 border-2 border-gray-200 border-none rounded-lg dark:border-gray-700 mt-14">
                    <div className="addStudentBtn mb-7 w-1/5">
                                    <Link to={'/school_admin/add_subject'}><Button>Add Subject</Button></Link>
                                </div>
                        <div className='academicYear'>
                        <AcademicYearDropDown
                        data = {academicYearData} isLoading = {isFetchingAcademicYearData} isError = {isAcademicYearFetchError} error = {academicYearError}
                        handleYearChange = {handleYearChange} setYearDropDown = {setYearDropDown} yearDropDown = {yearDropDown} selectedAcademicYear = {selectedAcademicYear}
                        />
                        </div>
                        <div className="classRoom">
                        <ClassDropDown
                        data = {classData} isLoading = {isFetchingClasses} isError = {isFetchClassError} error = {classError} handleClassChange = {handleClassChange}
                        setClassDropDown = {setClassDropDown} classDropDown = {classDropDown} selectedClassId = {selectedClassID} selectedClassName = {selectedClassName}
                        />
                        </div>
                        <>
                        <Table hoverable={true}>
            <Table.Head>
                <Table.HeadCell>
                    subject code
                </Table.HeadCell>
                <Table.HeadCell>
                    subject name
                </Table.HeadCell>
                <Table.HeadCell>
                    faculty
                </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">
                        Edit
                    </span>
                </Table.HeadCell>
            </Table.Head>
                        <AdminTable
                        data = {subjectData}
                        isLoading = {isFetchingSubjects}
                        isError = {isFetchSubjectError}
                        error = {subjectError}
                        />
                        </Table>
                        </>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetSubject