import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const token = localStorage.getItem('token')

function PrivateRoutes() {
  return (
    token ? <Outlet/> : <Navigate to={"/"}/>
  )
}

export default PrivateRoutes
