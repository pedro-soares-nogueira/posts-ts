import { createContext, ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { api } from './../lib/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './../hooks/useLocalstorage'

interface User {
  id: number
  name: string
  password: string
  avatarUrl: string
  role: string
}

interface AuthContextType {
  user: User[]
  logout: () => void
  fetchUser: (data: LoginUserInputs) => Promise<User[]>
}

interface AuthProviderProps {
  children: ReactNode
}

interface LoginUserInputs {
  username: string
  password: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage<User[]>('user-blog-dev-pedro', [])

  const fetchUser = async (data: LoginUserInputs) => {
    const { username, password } = data

    const response = await api.get(`users?username=${username}`)

    if (password === password) {
      setUser(response.data)
    }

    return response.data
  }

  const logout = () => {
    localStorage.removeItem('user-blog-dev-pedro')
  }

  return (
    <AuthContext.Provider value={{ user, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}
