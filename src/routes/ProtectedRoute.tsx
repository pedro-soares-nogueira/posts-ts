import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = sessionStorage.getItem('userId')

  if (!user) {
    return <Navigate to='/' />
  }

  return children
}

export default ProtectedRoute
