import React from 'react'
import { Route, Routes } from 'react-router-dom';
//Pages
import SignupPage from '../pages/School Admin/Signup Page/SignupPage';
import LoginPage from '../pages/School Admin/Login Page/LoginPage';
import OtpVerificationPage from '../pages/School Admin/Otp Page/OtpVerificationPage';
import HomePage from '../pages/School Admin/Home Page/HomePage'
import ProtectedRoutes from '../auth/ProtectedRoutes'
import AddStudentPage from '../pages/School Admin/Student Page/AddStudentPage'
import AddFacultyPage from '../pages/School Admin/Faculty Page/AddFacultyPage'
import AddClassRoomPage from '../pages/School Admin/Class Room Page/AddClassRoomPage'
import AddAcademicYearPage from '../pages/School Admin/Academic Year Page/AddAcademicYearPage'
import AddSubjectPage from '../pages/School Admin/Subject Page/AddSubjectPage'
import AddExamPage from '../pages/School Admin/Exam Page/AddExamPage'
import GetAllStudentPage from '../pages/School Admin/Student Page/GetAllStudentPage'
import EditStudentPage from '../pages/School Admin/Student Page/EditStudentPage'
import GetSubjectPage from '../pages/School Admin/Subject Page/GetSubjectPage'
import DashboardPage from '../pages/School Admin/Dashboard Page/DashboardPage'

//Errors
import PageNotFound from '../components/common/PageNotFound';
import { ErrorBoundary } from 'react-error-boundary';
import CommonError from '../components/common/CommonError';


const SchoolAdminRoutes = () => {
    return (
        <div>
            <ErrorBoundary
                FallbackComponent={CommonError}
                onError={() => console.log('Error in school admin route')}
            ></ErrorBoundary>
            <Routes>
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/otp' element={<OtpVerificationPage />} />

                <Route element={<ProtectedRoutes role='school_admin' />}>
                    <Route element={<HomePage />} path='/home' exact />
                    <Route element={<DashboardPage />} path='/dashboard' exact />
                    <Route element={<AddFacultyPage />} path='/addFaculty' exact />
                    <Route element={<AddStudentPage />} path='/addStudent' exact />
                    <Route element={<GetAllStudentPage />} path='/get_all_student' exact />
                    <Route element={<EditStudentPage />} path='/edit_student/:id' exact />
                    <Route element={<AddClassRoomPage />} path='/addClassroom' exact />
                    <Route element={<AddAcademicYearPage />} path='/addAcademicYear' exact />
                    <Route element={<AddSubjectPage />} path='/add_subject' exact />
                    <Route element={<GetSubjectPage />} path='/get_subject' exact />
                    <Route element={<AddExamPage />} path='/add_exam' exact />
                </Route>
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default SchoolAdminRoutes