// Dependencies
import React from 'react'
import {Route, Routes} from 'react-router-dom'

// Components
import LandingPage from './LandingPage/LandingPage'
import Login from './Login/Login'
import Register from './Register/Register'
import Reset from './Reset/Reset'

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />}  />
      <Route path="/login" exact element={<Login />}  />
      <Route path="/register" exact element={<Register />} />
      <Route path="/reset" exact element={<Reset />} />
    </Routes>
  )
}
