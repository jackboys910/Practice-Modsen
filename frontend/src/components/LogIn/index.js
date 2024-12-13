import './index.css'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginUser } from '../../api/userAPI'
import { setUser } from '../../store/slices/userSlice'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await loginUser(email, password)
    if (result.success) {
      dispatch(setUser({ user: result.data.nickname }))
      navigate('/')
    } else {
      alert(result.message)
    }
  }

  return (
    <div className='auth__container'>
      <h2 className='auth__title'>Log In</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input className='auth__input' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          className='auth__input'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='auth__button' type='submit'>
          Log In
        </button>
      </form>
    </div>
  )
}

export default LogIn
