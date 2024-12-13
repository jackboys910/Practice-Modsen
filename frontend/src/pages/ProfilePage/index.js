import './index.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../../components/Loader/index'
import { BACKEND_BASE_URL } from '../../constants/config'
import { fetchProfile, resetProfile, updateProfile } from '../../store/slices/profileSlice'
import profileValidationSchema from '../../utils/validation/profileValidation'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { profile, loading } = useSelector((state) => state.profile)
  const user = useSelector((state) => state.user.user)

  const [formData, setFormData] = useState({
    description: '',
    phoneNumber: '',
    location: '',
    favoriteBook: '',
    favoriteAuthor: '',
    profilePicture: null,
  })
  const [selectedFileName, setSelectedFileName] = useState('')
  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      setFormData({
        description: profile.description || '',
        phoneNumber: profile.phoneNumber || '',
        location: profile.location || '',
        favoriteBook: profile.favoriteBook || '',
        favoriteAuthor: profile.favoriteAuthor || '',
        profilePicture: null,
      })

      setProfilePictureUrl(
        profile.profilePicture ? `${BACKEND_BASE_URL}/images/${profile.profilePicture}` : `${BACKEND_BASE_URL}/images/defaultUser.png`,
      )
    }
  }, [profile])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    validateField(name, value)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData({ ...formData, profilePicture: file })
    setSelectedFileName(file ? file.name : '')
    validateField('profilePicture', file)
  }

  const validateField = async (field, value) => {
    try {
      await profileValidationSchema.validateAt(field, { [field]: value })
      setErrors((prev) => ({ ...prev, [field]: null }))
    } catch (err) {
      setErrors((prev) => ({ ...prev, [field]: err.message }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await profileValidationSchema.validate(formData, { abortEarly: false })
      const data = new FormData()
      for (const key in formData) {
        if (key === 'profilePicture' && !formData.profilePicture) {
          continue
        }

        if (formData[key]) {
          data.append(key, formData[key])
        }
      }
      dispatch(updateProfile(data))

      if (formData.profilePicture) {
        const objectUrl = URL.createObjectURL(formData.profilePicture)
        setProfilePictureUrl(objectUrl)
      }
    } catch (error) {
      const validationErrors = {}
      error.inner.forEach((error) => {
        validationErrors[error.path] = error.message
      })
      setErrors(validationErrors)
    }
  }

  const handleReset = () => {
    dispatch(resetProfile())
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='profile-page'>
      <h1 className='profile-page__title'>
        <span className='profile-page__title-highlight'>Welcome,</span> {user}
      </h1>

      <div className='profile-page_picture-container'>
        {profile?.profilePicture && <img src={profilePictureUrl} alt='Profile' className='profile-page__picture' />}
        <div className='profile-page__file-input-container'>
          <label htmlFor='profilePicture' className='profile-page__file-label'>
            Choose File
          </label>
          <input type='file' id='profilePicture' name='profilePicture' className='profile-page__file-input' onChange={handleFileChange} />
          <span className='profile-page__file-name'>{selectedFileName || 'No file chosen'}</span>
          {errors.profilePicture && <p className='profile-page__error'>{errors.profilePicture}</p>}
        </div>
      </div>

      <form className='profile-page__form' onSubmit={handleSubmit}>
        <div className='profile-page__form-group'>
          <label htmlFor='description' className='profile-page__label'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            className='profile-page__textarea'
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className='profile-page__error'>{errors.description}</p>}
        </div>
        <div className='profile-page__form-group'>
          <label htmlFor='phoneNumber' className='profile-page__label'>
            Phone Number
          </label>
          <input
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            className='profile-page__input'
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && <p className='profile-page__error'>{errors.phoneNumber}</p>}
        </div>
        <div className='profile-page__form-group'>
          <label htmlFor='location' className='profile-page__label'>
            Location
          </label>
          <input
            type='text'
            id='location'
            name='location'
            className='profile-page__input'
            value={formData.location}
            onChange={handleInputChange}
          />
          {errors.location && <p className='profile-page__error'>{errors.location}</p>}
        </div>
        <div className='profile-page__form-group'>
          <label htmlFor='favoriteBook' className='profile-page__label'>
            Favorite Book
          </label>
          <input
            type='text'
            id='favoriteBook'
            name='favoriteBook'
            className='profile-page__input'
            value={formData.favoriteBook}
            onChange={handleInputChange}
          />
          {errors.favoriteBook && <p className='profile-page__error'>{errors.favoriteBook}</p>}
        </div>
        <div className='profile-page__form-group'>
          <label htmlFor='favoriteAuthor' className='profile-page__label'>
            Favorite Author
          </label>
          <input
            type='text'
            id='favoriteAuthor'
            name='favoriteAuthor'
            className='profile-page__input'
            value={formData.favoriteAuthor}
            onChange={handleInputChange}
          />
          {errors.favoriteAuthor && <p className='profile-page__error'>{errors.favoriteAuthor}</p>}
        </div>
        <button type='submit' className='profile-page__button'>
          Update Profile
        </button>
        <button type='button' className='profile-page__button profile-page__button--reset' onClick={handleReset}>
          Reset Profile
        </button>
      </form>
    </div>
  )
}

export default ProfilePage
