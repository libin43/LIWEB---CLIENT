import React from 'react'
import FacultySelectYear from '../../../components/faculty/year/FacultySelectYear'
import {toast} from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectFaculty } from '../../../redux/reducers/facultySlice';
import ClassInCharge from '../../../components/faculty/classIncharge/ClassInCharge'

const ClassInchargePage = () => {
    const auth = localStorage.getItem('facultyToken');
    const { academicYearID } = useSelector(selectFaculty);
    console.count('classincharge page');
    if (auth !== '') {
        return (
            <div>
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
        return (
            <Navigate to={'/faculty/login'} />
        )
    }
}

export default ClassInchargePage