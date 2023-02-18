import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = localStorage.getItem('user-blog-dev-pedro')

  if (!user) {
    return <Navigate to='/' />
  }

  return children
}

export default ProtectedRoute
