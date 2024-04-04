import React from 'react'
import { useAuthStore } from '../stores/auth.js'
import { Outlet, Navigate } from 'react-router-dom'

const AuthContainer = () => {
    const token = useAuthStore((state)=>state.token)
  return (
    <>
        {token ? <Outlet/> : <Navigate to="/authentication/login"/>}
    </>
  )
}

export default AuthContainer