import React from 'react'
import { Route, Routes } from 'react-router-dom';
//Pages
import FacultyLoginPage from '../pages/Faculty/Login Page/FacultyLoginPage';
import FacultyExamSchedulePage from '../pages/Faculty/Exam Schedule Page/FacultyExamSchedulePage';
import ExamScoreInputPage from '../pages/Faculty/Exam Page/ExamScoreInputPage';
import ClassInchargePage from '../pages/Faculty/Class Incharge Page/ClassInchargePage';
import ClassResultPage from '../pages/Faculty/Class Result Page/ClassResultPage';
import FacultyDashboardPage from '../pages/Faculty/Dashboard Page/FacultyDashboardPage';
import FacultyProfilePage from '../pages/Faculty/Profile Page/FacultyProfilePage';
import ProtectedRoutes from '../auth/ProtectedRoutes';

//Errors
import PageNotFound from '../components/common/PageNotFound';
import { ErrorBoundary } from 'react-error-boundary';
import CommonError from '../components/common/CommonError';
import SubjectResultPage from '../pages/Faculty/Class Result Page/SubjectResultPage';


const FacultyRoutes = () => {
  return (
    <div>
      <ErrorBoundary
        FallbackComponent={CommonError}
        onError={() => console.log('Error in faculty route')}
      ></ErrorBoundary>

      <Routes>
        <Route path='/login' element={<FacultyLoginPage />} />

        <Route element={<ProtectedRoutes role='faculty' />}>
          <Route path='/home' element={<FacultyDashboardPage />} />
          <Route path='/profile' element={<FacultyProfilePage />} />
          <Route path='/exam_subjects_schedule' element={<FacultyExamSchedulePage />} />
          <Route path='/examination/exam_mark_input/students' element={<ExamScoreInputPage />} />
          <Route path='/examination/exam_mark_view/students' element={<SubjectResultPage />} />
          <Route path='/classes_incharge' element={<ClassInchargePage />} />
          <Route path='/class_overall_result/:classId' element={<ClassResultPage />} />
        </Route>


        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default FacultyRoutes