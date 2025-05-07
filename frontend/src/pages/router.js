import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from '../components/NavBar'
import { fetchUserFavorites } from '../store/slices/favoritesSlice'
import { isUserLoggedIn } from '../utils/auth'
import AutorizationPage from './AuthorizationPage'
import FavoritesPage from './FavoritesPage'
import MainPage from './MainPage'
import ProfilePage from './ProfilePage'
import QuizPage from './QuizPage'

const AppRouter = () => {
  const dispatch = useDispatch()
  const isAuthenticated = isUserLoggedIn()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserFavorites())
    }
  })

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/auth/:type' element={<AutorizationPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='/quiz' element={<QuizPage />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
