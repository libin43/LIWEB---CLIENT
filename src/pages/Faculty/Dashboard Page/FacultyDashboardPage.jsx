import React, { useEffect, useState } from 'react'
import NavbarCommon from '../../../components/navbar/NavbarCommon'
import FacultySelectYear from '../../../components/faculty/year/FacultySelectYear'
import FacultyStatistics from '../../../components/faculty/dashboard/FacultyStatistics'
import { useSelector } from 'react-redux'
import { selectFaculty } from '../../../redux/reducers/facultySlice'
import FacultyPieChart from '../../../components/faculty/dashboard/FacultyPieChart'
import { useFacultyDashboardStatisticsQuery } from '../../../api/faculty/apiSlice';


const FacultyDashboardPage = () => {
    const { academicYearID } = useSelector(selectFaculty);
    const [statsQuery, setStatsQuery] = useState(true);
    useEffect(()=>{
        if(academicYearID !==''){
            setStatsQuery(false);
        }
    },[academicYearID])

    const {data, isLoading, isError, error} = useFacultyDashboardStatisticsQuery(academicYearID,{skip:statsQuery});
  return (
    <div>
        <NavbarCommon/>
        <FacultySelectYear/>
        <FacultyStatistics data={data}/>
        <FacultyPieChart data = {data}/>
    </div>
  )
}

export default FacultyDashboardPage