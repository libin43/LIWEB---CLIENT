import React, {useState} from 'react'
import { useGetAcademicYearQuery } from '../../../api/schoolAdmin/apiSlice';

const GetStudents = () => {
    const [isAcademicYearOpen, setIsAcademicYearOpen] = useState(false);
    const [isClassOpen, setIsClassOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tableData, setTableData] = useState([
      { id: 1, name: 'John Doe', age: 30 },
      { id: 2, name: 'Jane Smith', age: 25 },
      { id: 3, name: 'Bob Johnson', age: 40 },
    ]);

    //rtk query
    const {data: academicYearData, isLoading: isFetchingAcademicYearData, isError: isAcademicYearFetchError, error: academicYearError} = useGetAcademicYearQuery();

  
    const handleAcademicYearClick = () => {
      setIsAcademicYearOpen(!isAcademicYearOpen);
      setIsClassOpen(false);
    };
  
    const handleClassClick = () => {
        setIsClassOpen(!isClassOpen);
      setIsAcademicYearOpen(false);
    };
  
    const handleSearchQueryChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleSearchClose = () => {
      setSearchQuery('');
      setIsAcademicYearOpen(false);
      setIsClassOpen(false);
    };
  
    const filteredData = tableData.filter((data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  return (
    <div className='addStudent'>
    <div className="m-3 ml-20 absolute inset-0 text-xl text-gray-900 font-semibold">
    <div className="p-4">
    <div className='container mx-auto p-4 mt-10'>
    <div className='flex flex-col md:flex-row md:items-center mb-7'>
      <div className='relative md:mr-4'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded-md' onClick={handleAcademicYearClick}>
          Academic Year {isAcademicYearOpen ? '▲' : '▼'}
        </button>
        {isAcademicYearOpen && (
          <div className='absolute z-10 w-full h-48 mt-2 md:mt-0 md:left-0 md:w-72 rounded-md shadow-lg bg-white overflow-y-auto'>
            <ul className='list-none'>
            {academicYearData?.academicYear.map((academicYear, index) => (
                <li className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>
                    {academicYear?.startDate} - {academicYear?.endDate}
                </li>
            ))}
            </ul>
          </div>
        )}
      </div>
      <div className='relative'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md' onClick={handleClassClick}>
        Class Room {isClassOpen ? '▲' : '▼'}
        </button>
        {isClassOpen && (
<div className='absolute z-10 w-full h-48 mt-2 md:mt-0 md:left-0 md:w-48 rounded-md shadow-lg bg-white overflow-y-auto'>
<ul className='list-none'>
<li className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>Option A</li>
<li className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>Option B</li>
<li className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>Option C</li>
<li className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>Option D</li>
<li className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>Option E</li>
<li className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>Option F</li>
<li className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>Option G</li>
<li className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>Option H</li>
<li className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>Option I</li>
<li className='hover:bg-gray-100 py-2 px-4 cursor-pointer'>Option J</li>
</ul>
</div>
)}
</div>
<div className='relative md:ml-4 flex-grow'>
<input
         type='text'
         className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
         placeholder='Search'
         value={searchQuery}
         onChange={handleSearchQueryChange}
       />
{searchQuery && (
<button
           className='absolute right-0 top-0 mt-2 mr-4'
           onClick={handleSearchClose}
         >
X
</button>
)}
</div>
</div>
<div className='overflow-x-auto'>
<table className='table-auto border-collapse w-full'>
<thead>
<tr>
<th className='border border-gray-400 px-4 py-2'>ID</th>
<th className='border border-gray-400 px-4 py-2'>Name</th>
<th className='border border-gray-400 px-4 py-2'>Age</th>
</tr>
</thead>
<tbody>
{filteredData.map((data) => (
<tr key={data.id}>
<td className='border border-gray-400 px-4 py-2'>{data.id}</td>
<td className='border border-gray-400 px-4 py-2'>{data.name}</td>
<td className='border border-gray-400 px-4 py-2'>{data.age}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
);
}

export default GetStudents