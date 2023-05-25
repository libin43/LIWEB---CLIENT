import React from 'react'
import { Route, Routes } from 'react-router-dom';
//Pages

import PageNotFound from '../components/common/PageNotFound';
import FacultyLoginPage from '../pages/Faculty/Login Page/FacultyLoginPage';
import FacultyHomePage from '../pages/Faculty/Home Page/FacultyHomePage';
import FacultyExamSchedulePage from '../pages/Faculty/Exam Schedule Page/FacultyExamSchedulePage';
import ExamScoreInputPage from '../pages/Faculty/Exam Page/ExamScoreInputPage';
import ClassInchargePage from '../pages/Faculty/Class Incharge Page/ClassInchargePage';
import ClassResultPage from '../pages/Faculty/Class Result Page/ClassResultPage';
import FacultyDashboardPage from '../pages/Faculty/Dashboard Page/FacultyDashboardPage';
import FacultyProfilePage from '../pages/Faculty/Profile Page/FacultyProfilePage';



const FacultyRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/login' element={<FacultyLoginPage/>}/>
    
    <Route path='/home' element={<FacultyDashboardPage/>}/>
    <Route path='/profile' element={<FacultyProfilePage/>}/>
    <Route path='/exam_subjects_schedule' element={<FacultyExamSchedulePage/>}/>
    <Route path='/exam_mark_input/students' element={<ExamScoreInputPage/>}/>
    <Route path='/classes_incharge' element={<ClassInchargePage/>}/>
    <Route path='/class_overall_result/:classId' element={<ClassResultPage/>}/>


    {/* <Route element={<ProtectedRoutes role = 'faculty'/>}>
    </Route> */}
    <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </div>
  )
}

export default FacultyRoutes