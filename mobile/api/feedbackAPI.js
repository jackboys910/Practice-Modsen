import AsyncStorage from '@react-native-async-storage/async-storage'
import { BACKEND_BASE_URL } from '../constants/config'

export const submitFeedbackAPI = async ({ isUseful, suggestion }) => {
  try {
    const token = await AsyncStorage.getItem('token')
    if (!token) throw new Error('User not authenticated')

    const response = await fetch(`${BACKEND_BASE_URL}/submitFeedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isUseful, suggestion }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const errorMessage = errorData?.error || 'Failed to submit feedback'
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}
