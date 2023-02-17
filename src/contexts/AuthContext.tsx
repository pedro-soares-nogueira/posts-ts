import { createContext, ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { api } from './../lib/axios'

interface User {
  id: number
  name: string
  avatarUrl: string
  role: string
}

interface AuthContextType {
  user: User[]
  logout: () => void
  loggedUser: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User[]>([])

  const id = sessionStorage.getItem('userId')

  const loggedUser = async () => {
    const response = await api.get(`users?id=${id}`)

    setUser(response.data)
    console.log(response.data)
  }

  const logout = () => {
    sessionStorage.removeItem('userId')
  }

  useEffect(() => {
    loggedUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, logout, loggedUser }}>
      {children}
    </AuthContext.Provider>
  )
}
