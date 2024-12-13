import { BACKEND_BASE_URL } from '../constants/config'

export const fetchAverageRatingAPI = async (bookUri) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/getAverageRating/${bookUri}`)
    if (!response.ok) throw new Error('Failed to fetch average rating')
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const fetchUserRatingAPI = async (bookUri) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_BASE_URL}/getUserRating/${bookUri}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error('Failed to fetch user rating')
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const submitBookRatingAPI = async ({ bookUri, rating }) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BACKEND_BASE_URL}/setRating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookUri, rating }),
    })
    if (!response.ok) throw new Error('Failed to submit rating')
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}
