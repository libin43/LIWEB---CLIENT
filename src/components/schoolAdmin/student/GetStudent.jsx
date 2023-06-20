import React, { useEffect, useState } from 'react'
import { Button, Table } from 'flowbite-react'
import { Spinner } from 'flowbite-react';
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';

import { useBlockUnblockStudentMutation, useGetAcademicYearQuery, useGetAllStudentsByClassQuery, useGetAllStudentsBySearchQuery, useGetClassByAcademicYearQuery } from '../../../api/schoolAdmin/apiSlice'
import Paginate from '../../pagination/Paginate';

const GetStudent = () => {  
    const [selectAcademicYearStartDate, setSelectAcademicYearStartDate] = useState('');
    const [selectAcademicYearEndDate, setSelectAcademicYearEndDate] = useState('');
    const [selectAcademicYearID, setSelectAcademicYearID] = useState('');
    const [selectClass, setSelectClass] = useState('')
    const [selectClassName, setSelectClassName] = useState('')
    const [yearDropDown, setYearDropDown] = useState(false);
    const [classDropDown,setClassDropDown] = useState(false);
    const [classQuery, setClassQuery] = useState(true);
    const {data: academicYearData, isLoading: isFetchingAcademicYearData, isError: isAcademicYearFetchError, error: academicYearError} = useGetAcademicYearQuery();
    const {data: classData, isLoading: isFetchingClasses, isError: isFetchClassError, error: classError} = useGetClassByAcademicYearQuery(selectAcademicYearID,{skip: classQuery});
    const [blockStatus, {isLoading}] = useBlockUnblockStudentMutation();

    //pagination
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentStudent, setCurrentStudent] = useState([]);
    const [studentQuery, setStudentQuery] = useState(true);
    const {data: studentData, isLoading: isFetchingStudents, isError: isFetchStudentsError, error: studentsError} = useGetAllStudentsByClassQuery({selectClass, currentPage, itemsPerPage},{skip: studentQuery});
    // search
    const [inputSearch, setInputSearch] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [currentFilterPage, setCurrentFilterPage] = useState(1);
    const [totalSearchPages, setTotalSearchPages] = useState(0);
    const [filteredStudent, setFilteredStudent] = useState([]);
    const [filterEmpty, setFilterEmpty] = useState(false);
    const [searchQuery, setSearchQuery] = useState(true);
    const debounce = useDebounce(inputSearch, 2000);
    const {data: searchData, isLoading: isFetchingSearch, isError: isFetchSearchError, error: searchError} = useGetAllStudentsBySearchQuery({selectClass, currentFilterPage, itemsPerPage, searchKey},{skip: searchQuery});


    const handleYearChange = (academicYear) =>{
        setSelectAcademicYearStartDate(academicYear.startDate);
        setSelectAcademicYearEndDate(academicYear.endDate);
        setSelectAcademicYearID(academicYear.id);
        setYearDropDown(false);
        setClassQuery(false);
    }
    const handleClassChange = (classRoom) =>{
        if(filteredStudent?.length>0){
            setFilterEmpty(true);
        }
        if(classRoom._id !== selectClass){
        if(currentStudent!=null){
            setCurrentStudent(null);
        }
        setSelectClass(classRoom._id);
        setSelectClassName(classRoom.className);
        setClassDropDown(false);
        setCurrentPage(1);
        setStudentQuery(false);
        }
        else{
            setInputSearch('')
        }
    }
    const onPageChange = (e) =>{
        if (e !== currentPage) {
            setCurrentPage(e);
            setStudentQuery(false);
          }
    }
    const handleSearch = (searchItem) =>{
        setSearchKey(searchItem);
        setCurrentFilterPage(1);
        setSearchQuery(false);
    }
    const onSearchPageChange = (e) =>{
        if (e !== currentFilterPage) {
            setCurrentFilterPage(e);
            setSearchQuery(false);
        }
    }
    const handleSearchInputChange = (e) =>{
        setFilterEmpty(false)
        if(e.target.value ===''){
            setFilterEmpty(true);
        }
        setInputSearch(e.target.value);
    }
    const onSearchClose = () =>{
        setFilterEmpty(true);
        setInputSearch('');
    }
//search


//STUDENT TABLE
const studentTable = () => {
     if(currentStudent && currentStudent.students) {
        return (
            <Table.Body className="divide-y">
                {
                    currentStudent.students.map((students, index) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {students.studentName}
                            </Table.Cell>
                            <Table.Cell>
                                {students.email}
                            </Table.Cell>
                            <Table.Cell>
                                {students.phone}
                            </Table.Cell>
                            <Table.Cell>
                                {students.block ?
                                    <Button color="success" onClick={() => accessControl(false, students._id)}>
                                        Unblock
                                    </Button>
                                    :
                                    <Button color="failure" onClick={() => accessControl(true, students._id)}>
                                        Block
                                    </Button>
                                }
                            </Table.Cell>
                            <Table.Cell>
                                <Link
                                    to={`/school_admin/edit_student/${students._id}`}
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Edit
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        )
    }
}

//CLASS DROPDOWN
const classSelect = () => {
    if(isFetchClassError){
        return(
            <>
            <p>Error while fetching class data</p>
            </>
        );
    }
    else if(classData) {
        return (
            <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 mb-6 md:w-1/2 w-full dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <div
                onClick={() => setClassDropDown(!classDropDown)}
                className={` dark:bg-stone-800 w-full mt-1 ml-1 text-white flex items-center justify-between ${!selectClass && "text-gray-700"
                    }`}
            > 
                {selectClassName ? selectClassName : "Select Class"}
                <BiChevronDown size={20} className={`${classDropDown && "rotate-180"}`} />
            </div>
            <ul
                className={` dark:bg-stone-800 mt-2 overflow-y-auto ${classDropDown ? "max-h-32" : "max-h-0"} `}
            >
                {
                    classData?.classRoom.length ===0 ?
                    (<Link to='/school_admin/addClassRoom'>
                    <li className={`p-2 text-sm hover:bg-blue-500 hover:text-black`}>Add Class</li>
                    </Link>)
                    :
                    (classData?.classRoom.map((classRoom, index) => (
                        <li
                            key={index}
                            className={`p-2 text-sm hover:bg-blue-500 hover:text-black`}
                            onClick={() => handleClassChange(classRoom)}
                        >
                            {classRoom?.className}
                        </li>
                    )))
                }
            </ul>
        </div>
        )
    }
}

//SEARCH TABLE
const searchTable = () => {
    if(filteredStudent && filteredStudent.students) {
       return (
           <Table.Body className="divide-y">
               {
                   filteredStudent.students.map((students, index) => (
                       <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                           <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                               {students.studentName}
                           </Table.Cell>
                           <Table.Cell>
                               {students.email}
                           </Table.Cell>
                           <Table.Cell>
                               {students.phone}
                           </Table.Cell>
                           <Table.Cell>
                               {students.block ?
                                   <Button color="success" onClick={() => accessControl(false, students._id)}>
                                       Unblock
                                   </Button>
                                   :
                                   <Button color="failure" onClick={() => accessControl(true, students._id)}>
                                       Block
                                   </Button>
                               }
                           </Table.Cell>
                           <Table.Cell>
                               <a
                                   href="/tables"
                                   className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                               >
                                   Edit
                               </a>
                           </Table.Cell>
                       </Table.Row>
                   ))
               }
           </Table.Body>
       )
   }
   else if(filteredStudent && filteredStudent.students === null){
    return(
        <Table.Body className="divide-y">
                       <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                           <Table.Cell>
                            No records
                           </Table.Cell>
                       </Table.Row>
           </Table.Body>
    )
   }
}
  

    useEffect(() => {
        const currentStudentArray = studentData || [];
        setCurrentStudent(currentStudentArray);
        const classTotal = studentData?.classStrength || 0;
        const pageReq = Math.ceil(classTotal/itemsPerPage)
        setTotalPages(pageReq);
        if(debounce){
         
            handleSearch(debounce);
        }
      }, [studentData,totalPages,debounce]);

      useEffect(() => {
        if(filterEmpty){
            setFilteredStudent(null);
        }
        else{
            const filteredData = searchData || [];
        setFilteredStudent(filteredData);
        const filterTotal = searchData?.classStrength || 0;
        const pageReq = Math.ceil(filterTotal/itemsPerPage)
        setTotalSearchPages(pageReq);
        }
      },[searchData,totalSearchPages,filterEmpty])

    async function accessControl(status, studentID) {

        const data = { status, studentID };
        try {
            const res = await blockStatus(data).unwrap();
        }
        catch (error) {
            console.log(error);
        }
    }



    if(isFetchingAcademicYearData){
       return(
        <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
        </div>
       )
    }

     if(isAcademicYearFetchError){
        console.log(academicYearError);
        return;
    }
     if(isFetchStudentsError){
        console.log(studentsError,'...............');
        return;
    }

     if(academicYearData){
        return (
            <div>
                <div className='addStudent'>
                    <div className="m-3 ml-20 absolute inset-0 text-xl text-gray-900 font-semibold">
                        <div className="p-4">
                            <div className="p-4 border-2  border-none rounded-lg  mt-14">
                                <div className="addStudentBtn mb-7 w-1/5">
                                    <Link to={'/school_admin/addStudent'}><Button>Add Student</Button></Link>
                                </div>
                            <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 mb-6 md:w-1/2 w-full dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                                      <div
                                                          onClick={() => setYearDropDown(!yearDropDown)}
                                                          className={` dark:bg-stone-800 w-full mt-1 ml-1 text-white flex items-center justify-between ${!selectAcademicYearStartDate && !selectAcademicYearEndDate && "text-gray-700"}`}
                    
                                                      >
                                                        
                                                          {selectAcademicYearStartDate && selectAcademicYearEndDate
                                                              ? `${selectAcademicYearStartDate} - ${selectAcademicYearEndDate}`
                                                              : "Select Academic Year"}
                                                          <BiChevronDown size={20} className={`${yearDropDown && "rotate-180"}`} />
                                                      </div>
                                                      <ul
                                                          className={` dark:bg-stone-800 mt-2 overflow-y-auto ${yearDropDown ? "max-h-24" : "max-h-0"} `}
                                                      >
      
                                                          {academicYearData?.academicYear.map((academicYear, index) => (
                                                              <li
                                                                  key={index}
                                                                  className={`p-2 text-sm hover:bg-blue-500 hover:text-black`}
                                                                  onClick={() => handleYearChange(academicYear)}
                                                              >
                                                                  {academicYear?.startDate} - {academicYear?.endDate}
                                                              </li>
                                                          ))}
                                                      </ul>
                                                  </div>

                                                <div className='class_dropdown'>
                                                  {
                                                    isFetchingClasses ?
                                                    <div className="text-center">
                                                      <Spinner aria-label="Center-aligned spinner example" />
                                                    </div>
                                                    :
                                                    classSelect()                                      
                                                  }
                                                </div>
                                <div className='flex md:justify-end justify-start mb-6'>
                                    {
                                        studentData && studentData.students ?
                                        (
                                        <span>
                                        <BiSearch className='inline-block'/>
                                        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-stone-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type='text' 
                                        value={inputSearch}
                                        onChange={handleSearchInputChange}
                                        placeholder='Search'
                                        />
                                        <AiOutlineClose className='inline-block'onClick={onSearchClose}/>
                                        </span>
                                        )
                                        :
                                        ''
                                    }
                                </div>
                                {
                                    isFetchingStudents || isFetchingSearch ?
                                    (
                                        <div role="status" className='flex justify-center items-center h-screen'>
                                        <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                        </div>
                                    )
                                    :
                                    ''
                                }
                                                  
                                <Table hoverable={true}>
                                    <Table.Head>
                                        <Table.HeadCell>
                                            student name
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            email
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            phone
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            restriction
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </Table.HeadCell>
                                    </Table.Head>
                                    {searchTable() ? searchTable() : studentTable()}
                                </Table>

                                <div className='no_data_found text-center'>
                                    {
                                        studentData && studentData?.classStrength===0 ?
                                        (<span className=''>No Students in this class</span>) : ''
                                    }
                                </div>
                                <div className='flex lg:flex-col items-center justify-start'>
                                    {
                                        filteredStudent && filteredStudent.students ?
                                        <Paginate currentPage={currentFilterPage} onPageChange={onSearchPageChange} totalPages={totalSearchPages}/>
                                        :
                                        <Paginate currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      
      
      
      
            </div>
        )
    }



}

export default GetStudent