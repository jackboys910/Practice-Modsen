import { BACKEND_BASE_URL } from '../constants/config'

export const submitFeedbackAPI = async ({ isUseful, suggestion }) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_BASE_URL}/submitFeedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isUseful, suggestion }),
    })
    if (!response.ok) throw new Error('Failed to submit feedback')
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}
