import { BACKEND_BASE_URL } from '../constants/config'

export const fetchFavorites = async () => {
  const token = localStorage.getItem('token')
  if (!token) return { success: false, message: 'Not authorized' }

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.ok) {
      const data = await response.json()
      return { success: true, data }
    } else {
      return { success: false, message: 'Failed to fetch favorites' }
    }
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return { success: false, message: 'Error fetching favorites' }
  }
}

export const addFavorite = async (bookUri) => {
  const token = localStorage.getItem('token')
  if (!token) return { success: false, message: 'Not authorized' }

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookUri }),
    })
    if (response.ok) {
      return { success: true }
    } else {
      return { success: false, message: 'Failed to add favorite' }
    }
  } catch (error) {
    console.error('Error adding favorite:', error)
    return { success: false, message: 'Error adding favorite' }
  }
}

export const removeFavorite = async (bookUri) => {
  const token = localStorage.getItem('token')
  if (!token) return { success: false, message: 'Not authorized' }

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/favorites/${bookUri}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.ok) {
      return { success: true }
    } else {
      return { success: false, message: 'Failed to remove favorite' }
    }
  } catch (error) {
    console.error('Error removing favorite:', error)
    return { success: false, message: 'Error removing favorite' }
  }
}
