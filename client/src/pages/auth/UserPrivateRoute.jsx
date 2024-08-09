import React from 'react'
//import { useAuth } from '../../context/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function UserPrivateRoute() {
    //const [auth] = useAuth()
    const location = useLocation()
    const data = localStorage.getItem("auth")
    const parseData = JSON.parse(data)
    //console.log(parseData.user.role)
    return (
        <>
            {parseData?.user?.role === 0 ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />}
        </>
    )
}

export default UserPrivateRoute