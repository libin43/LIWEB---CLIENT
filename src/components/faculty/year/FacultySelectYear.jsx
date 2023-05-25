import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useFacultyGetAcademicYearQuery } from '../../../api/faculty/apiSlice';
import { setAcademicYearID } from '../../../redux/reducers/facultySlice';

const FacultySelectYear = () => {
  console.count('select year component');

    const {data: academicYearData, isLoading: isFetchingAcademicYearData, isError: isAcademicYearFetchError, error: academicYearError} = useFacultyGetAcademicYearQuery();
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState({id:'', startDate:'', endDate:''});
    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionChange = (selectedYear) => {
      console.log('fuhnctioon calle');
      console.log(selectedYear);
      setSelectedYear({id: selectedYear.id, startDate: selectedYear.startDate, endDate: selectedYear.endDate });
      dispatch(setAcademicYearID(selectedYear));
      };
      
      // useEffect(() => {
      //   dispatch(setAcademicYearID(selectedYear))
      // },[selectedYear])

  

    if(isFetchingAcademicYearData){
        return(
            <div role="status" className='flex justify-center items-center h-screen'>
                <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
    else if(isAcademicYearFetchError){
        console.log(academicYearError);
        if(academicYearError?.status === 401){
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
    else if(academicYearData){
      console.log(academicYearData);
        return (
            <div className="relative mx-auto mt-10 w-4/5 md:w-5/12 ">
          <h3>Select to view data</h3>

            <button
            className="bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-14 w-full text-left"
            onClick={toggleDropdown}
          >
            {selectedYear.id!=='' ? `${selectedYear.startDate} - ${selectedYear.endDate}` : "Select academic year"}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  isOpen && "-rotate-180"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        
            <ul className={`absolute z-50 bg-white border border-gray-400 mt-1 py-1 px-0 rounded shadow w-full max-h-32 overflow-y-auto transition duration-300 ease-in-out opacity-0 transform scale-0 ${isOpen ? 'opacity-100 scale-100' : ''}`}>
              {academicYearData.academicYear.map((year, index) => (
                <li
                  key={index}
                  className="text-gray-800 hover:bg-gray-200 px-4 py-2 cursor-pointer"
                  onClick={() => {
                    setIsOpen(false)
                    if(year.id !== selectedYear.id){
                      handleOptionChange({id: year.id, startDate: year.startDate, endDate: year.endDate})
                    }
                  }}
                >
                  {year.startDate} - {year.endDate}
                </li>
              ))}
            </ul>
        </div>
          )
    }
}

export default FacultySelectYear