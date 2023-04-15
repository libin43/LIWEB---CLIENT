import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'

const ProtectedRoutes = () => {
    console.log('calling in  protected routes');
    
    const auth = localStorage.getItem('token')
    console.log(auth);

    return (
        <React.Fragment>
            {
        auth ? <Outlet/> : <Navigate to={'/school_admin/login'} />
            }
        </React.Fragment>
    )
}

export default ProtectedRoutes