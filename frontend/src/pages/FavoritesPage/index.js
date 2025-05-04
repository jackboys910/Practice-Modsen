import './index.css'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../../components/Loader'
import { fetchUserFavorites, removeUserFavorite } from '../../store/slices/favoritesSlice'

const FavoritesPage = () => {
  const dispatch = useDispatch()
  const { favorites, loading, error } = useSelector((state) => state.favorites)

  useEffect(() => {
    dispatch(fetchUserFavorites())
  }, [dispatch])

  const handleRemove = (book) => {
    dispatch(removeUserFavorite(book.bookUri))
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div className='favorites'>
      <h1>Your Favorites</h1>
      <div className='favorites__list'>
        {favorites.length > 0 ? (
          favorites.map((favorite) => {
            const { bookDetails } = favorite
            if (!bookDetails) return null

            const { volumeInfo } = bookDetails
            const { title, authors, description, imageLinks } = volumeInfo || {}

            return (
              <div key={favorite.id} className='favorites__item'>
                <img src={imageLinks?.thumbnail} alt={title || 'No title available'} className='favorites__item-image' />
                <div className='favorites__item-info'>
                  <h3>{title || 'No title available'}</h3>
                  <p>{authors?.join(', ') || 'No authors available'}</p>
                  <p className='favorites__item-description'>{description || 'No description available.'}</p>
                </div>
                <button className='favorites__item-remove' onClick={() => handleRemove(favorite)}>
                  &times;
                </button>
              </div>
            )
          })
        ) : (
          <p>You have no favorite books.</p>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
