import './index.css'
import '../LogIn/index.css'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { registerUser } from '../../api/userAPI'
import { setUser } from '../../store/slices/userSlice'
import { signUpValidationSchema } from '../../utils/validation/authValidation'

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
  })
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    validateField(name, value)
  }

  const validateField = async (field, value) => {
    try {
      await signUpValidationSchema.validateAt(field, { [field]: value })
      setErrors((prev) => ({ ...prev, [field]: null }))
    } catch (err) {
      setErrors((prev) => ({ ...prev, [field]: err.message }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await signUpValidationSchema.validate(formData, { abortEarly: false })

      const result = await registerUser(formData.email, formData.password, formData.nickname)
      if (result.success) {
        dispatch(setUser({ user: formData.nickname }))
        navigate('/')
      } else {
        alert(result.message)
      }
    } catch (error) {
      const validationErrors = {}
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message
      })
      setErrors(validationErrors)
    }
  }

  return (
    <div className='auth__container'>
      <h2 className='auth__title'>Sign Up</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input
          className='auth__input'
          type='text'
          name='nickname'
          placeholder='Nickname'
          value={formData.nickname}
          onChange={handleInputChange}
          required
        />
        {errors.nickname && <p className='auth__error'>{errors.nickname}</p>}
        <input
          className='auth__input'
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <p className='auth__error'>{errors.email}</p>}
        <input
          className='auth__input'
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {errors.password && <p className='auth__error'>{errors.password}</p>}
        <button className='auth__button' type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp
