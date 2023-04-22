import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'

const ProtectedRoutes = (props) => {
    console.log('calling in  protected routes');
    
    const auth = localStorage.getItem('schoolAdminToken')
    console.log(auth);

    return (
        <React.Fragment>
            {
        auth ? <Outlet/> : <Navigate to={`/${props.role}/login`} />
            }
        </React.Fragment>
    )
}

export default ProtectedRoutes