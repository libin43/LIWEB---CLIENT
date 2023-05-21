import React from 'react'
import NavbarCommon from '../../../components/navbar/NavbarCommon'
import FacultySelectYear from '../../../components/faculty/year/FacultySelectYear'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectFaculty } from '../../../redux/reducers/facultySlice';
import ClassInCharge from '../../../components/faculty/classIncharge/ClassInCharge'

const ClassInchargePage = () => {
    const { facultyToken } = useSelector(selectFaculty);
    const { academicYearID } = useSelector(selectFaculty);
    console.count(facultyToken, 'classincharge page');
    if (facultyToken.facultyToken !== '') {
        return (
            <div>
                <NavbarCommon />
                <FacultySelectYear />
                {
                    academicYearID !== '' ?
                        <ClassInCharge selectedYearID={academicYearID} /> :
                        ''
                }
            </div>
        )
    }
    else {
        return (
            <Navigate to={'/faculty/login'} />
        )
    }
}

export default ClassInchargePage