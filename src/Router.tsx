import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Register from './pages/Register'

const Router = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/feed' element={<Feed />} />
      </Route>
    </Routes>
  )
}

export default Router
