import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from '../pages/Login'
import Feed from '../pages/Feed'
import Register from '../pages/Register'
import { BrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/feed'
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
