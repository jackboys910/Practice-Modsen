import AsyncStorage from '@react-native-async-storage/async-storage'
import { BACKEND_BASE_URL } from '../constants/config'

export const registerUser = async (email, password, nickname) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, nickname }),
    })
    if (response.ok) {
      const { token } = await response.json()
      if (token) {
        await AsyncStorage.setItem('token', token)
      }
      return { success: true, message: 'User registered successfully' }
    } else {
      const errorData = await response.json()
      return {
        success: false,
        message: errorData.message || 'Registration failed',
      }
    }
  } catch (error) {
    console.error('Error during registration:', error)
    return { success: false, message: 'Error during registration' }
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server did not return JSON')
    }

    if (response.ok) {
      const { token, nickname, userId } = await response.json()
      if (token) {
        await AsyncStorage.setItem('token', token)
      }
      return { success: true, data: { nickname, userId } }
    } else {
      const errorData = await response.json()
      return {
        success: false,
        message: errorData.message || 'Invalid credentials',
      }
    }
  } catch (error) {
    console.error('Error during login:', error)
    return { success: false, message: 'Login failed' }
  }
}

export const getCurrentUser = async () => {
  const token = await AsyncStorage.getItem('token')
  if (!token) {
    return { success: false, message: 'Not authorized' }
  }

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/getProfile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return { success: true, data }
    } else {
      return { success: false, message: 'Not authorized' }
    }
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return { success: false, message: 'Error fetching user profile' }
  }
}
