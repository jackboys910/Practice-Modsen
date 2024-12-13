import './index.css'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { getCurrentUser } from '../../api/userAPI'
import { logout, setUser } from '../../store/slices/userSlice'

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const fetchUser = async () => {
        const result = await getCurrentUser()
        if (result.success) {
          dispatch(setUser({ user: result.data.nickname }))
        } else {
          dispatch(logout())
        }
      }
      fetchUser()
    }
  }, [dispatch, user])

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className='navbar'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className='navbar__logo'>LibraryApp</div>
      </Link>
      <div className='navbar__actions'>
        {user ? (
          <>
            <Link to='/profile'>
              <svg style={{ width: 40, height: 40, marginTop: 4 }} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
                <path
                  fill='#ffffff'
                  d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l293.1 0c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1l-91.4 0zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z'
                />
              </svg>
            </Link>
            <button className='navbar__button' onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to='/auth/login'>
              <button className='navbar__button'>Log In</button>
            </Link>
            <Link to='/auth/signup'>
              <button className='navbar__button navbar__button-primary'>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
