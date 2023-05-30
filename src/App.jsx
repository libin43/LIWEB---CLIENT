import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import CommonError from './components/common/CommonError'
import './App.css'

//Routes
import FacultyRoutes from './routes/FacultyRoutes'
import SchoolAdminRoutes from './routes/SchoolAdminRoutes'

//Error
import PageNotFound from './components/common/PageNotFound'

const App = () => {

  return (
    <div className='App'>
      <ErrorBoundary
        FallbackComponent={CommonError}
        onError={() => console.log('Error in react app.jsx')}
      >
        <Router>
          <Routes>

            {/* School Admin Route */}
            <Route path='/school_admin/*' element={<SchoolAdminRoutes />} />

            {/* Faculty Route */}
            <Route path='/faculty/*' element={<FacultyRoutes />} />

            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  )
}

export default App
