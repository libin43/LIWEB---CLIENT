import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import CommonError from './components/common/CommonError'
import './app.css'

//School Admin
import SignupPage from './pages/School Admin/SignupPage'
import LoginPage from './pages/School Admin/LoginPage'
import HomePage from './pages/School Admin/HomePage'
import OtpVerificationPage from './pages/School Admin/OtpVerificationPage'
import ProtectedRoutes from './auth/ProtectedRoutes'
import AddStudentPage from './pages/School Admin/AddStudentPage'

//Error
import PageNotFound from './components/common/PageNotFound'
import DashboardPage from './pages/School Admin/DashboardPage'
import AddFacultyPage from './pages/School Admin/AddFacultyPage'
import AddClassRoomPage from './pages/School Admin/AddClassRoomPage'
import AddAcademicYearPage from './pages/School Admin/AddAcademicYearPage'
import AddSubjectPage from './pages/School Admin/AddSubjectPage'

const App = () => {

  return (
    <div className='App'>
      <ErrorBoundary
      FallbackComponent={CommonError}
      onError={()=>console.log('Error happend')}
      >
      <Router>
        <Routes>
          <Route path='/school_admin/signup' element={<SignupPage/>}/>
          <Route path='/school_admin/login' element={<LoginPage/>}/>
          <Route path='/school_admin/otp' element={<OtpVerificationPage/>}/>

          <Route element={<ProtectedRoutes role = 'school_admin'/>}>
            
            <Route element={<HomePage/>} path='/school_admin/home' exact />
            <Route element={<DashboardPage/>} path='/school_admin/dashboard' exact />
            <Route element={<AddFacultyPage/>} path='/school_admin/addFaculty' exact />
            <Route element={<AddStudentPage/>} path='/school_admin/addStudent' exact/>
            <Route element={<AddClassRoomPage/>} path='/school_admin/addClassroom' exact/>
            <Route element={<AddAcademicYearPage/>} path='/school_admin/addAcademicYear' exact/>
            <Route element={<AddSubjectPage/>} path='/school_admin/add_subject' exact/>
          </Route>





          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </Router>
      </ErrorBoundary>
    </div>
  )
}

export default App
