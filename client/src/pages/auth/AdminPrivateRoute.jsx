import React from 'react'
//import { useAuth } from '../../context/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function AdminPrivateRoute() {
    //const [auth] = useAuth()
    const location = useLocation()
    const data = localStorage.getItem("auth")
    const parseData = JSON.parse(data)
  return (
    <>
   {parseData?.user?.role ===1 ? <Outlet/> : <Navigate to='/login' state={{from:location}} />}
    </>
  )
}

export default AdminPrivateRoute