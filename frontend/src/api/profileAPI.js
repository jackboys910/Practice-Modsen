import { BACKEND_BASE_URL } from '../constants/config'

export const fetchProfileAPI = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_BASE_URL}/getProfile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch profile')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message || 'An error occurred' }
  }
}

export const updateProfileAPI = async (formData) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_BASE_URL}/updateProfile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to update profile')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message || 'An error occurred' }
  }
}

export const resetProfileAPI = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_BASE_URL}/resetProfile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to reset profile')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message || 'An error occurred' }
  }
}
