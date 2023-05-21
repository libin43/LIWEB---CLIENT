import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'

const ProtectedRoutes = (props) => {
    console.count('calling in  protected routes');
    
    const auth = localStorage.getItem('schoolAdminToken')
    console.count(auth);

    return (
        <React.Fragment>
            {
        auth ? <Outlet/> : <Navigate to={`/${props.role}/login`} />
            }
        </React.Fragment>
    )
}

export default ProtectedRoutes