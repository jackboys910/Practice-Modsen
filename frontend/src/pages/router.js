import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from '../components/NavBar'
import AutorizationPage from './AuthorizationPage'
import MainPage from './MainPage'
import ProfilePage from './ProfilePage'

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/auth/:type' element={<AutorizationPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
