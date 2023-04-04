import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

//School Admin
import SignupPage from './pages/School Admin/SignupPage'
import LoginPage from './pages/School Admin/LoginPage'

//Error
import PageNotFound from './components/common/PageNotFound'

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/school_admin/signup' element={<SignupPage/>}/>
          <Route path='/school_admin/login' element={<LoginPage/>}/>

          
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
