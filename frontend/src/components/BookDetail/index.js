import './index.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { API_BASE_URL, API_KEY } from '../../constants/config'
import { getAverageRating, getUserRating, setBookRating } from '../../store/slices/ratingSlice'
import { isUserLoggedIn } from '../../utils/auth'

const BookDetail = ({ book, onBack, onAuthorSearch }) => {
  const dispatch = useDispatch()
  const { averageRating, userRating } = useSelector((state) => state.rating)
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(0)
  const [image, setImage] = useState(null)
  const { volumeInfo } = book
  const { title, authors, categories, description, imageLinks } = volumeInfo || {}

  const isAuthenticated = isUserLoggedIn()

  const fetchImage = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${bookId}?key=${API_KEY}`)
      const data = await response.json()
      if (data.volumeInfo && data.volumeInfo.imageLinks) {
        setImage(
          data.volumeInfo.imageLinks.extraLarge ||
            data.volumeInfo.imageLinks.large ||
            data.volumeInfo.imageLinks.medium ||
            data.volumeInfo.imageLinks.small ||
            data.volumeInfo.imageLinks.thumbnail ||
            data.volumeInfo.imageLinks.smallThumbnail,
        )
      } else {
        console.error('No image links available')
        setImage(null)
      }
    } catch (error) {
      console.error('Error fetching image:', error)
      setImage(null)
    }
  }

  useEffect(() => {
    if (book.id) {
      fetchImage(book.id)
    }
  }, [book])

  useEffect(() => {
    if (book.id) {
      dispatch(getAverageRating(book.id))
      if (isAuthenticated) {
        dispatch(getUserRating(book.id))
      }
    }
  }, [book.id, dispatch, isAuthenticated])

  useEffect(() => {
    setSelectedRating(userRating || 0)
  }, [userRating])

  const handleAuthorClick = (author) => {
    onAuthorSearch(`"${author}"`)
  }

  const handleSetRating = (rating) => {
    setSelectedRating(rating)
    dispatch(setBookRating({ bookUri: book.id, rating }))
  }

  const renderStars = (rating, isHover = false, isInteractive = false) =>
    [...Array(5)].map((_, index) => {
      const starValue = index + 1
      const isGold = isHover ? starValue <= hoverRating : starValue <= rating
      return (
        <i
          key={index}
          className={`fa fa-star ${isGold ? 'gold' : 'gray'}`}
          onMouseEnter={isInteractive ? () => setHoverRating(starValue) : null}
          onMouseLeave={isInteractive ? () => setHoverRating(0) : null}
          onClick={isInteractive ? () => handleSetRating(starValue) : null}
        ></i>
      )
    })

  return (
    <div className='book-detail'>
      <div className='book-detail__block'>
        <div className='book-detail__block-image'>{image && <img className='book-detail__image-big' src={image} alt={title} />}</div>
      </div>
      <div className='book-detail__block'>
        <div className='book-detail__arrow-align'>
          <i className='fa fa-arrow-left book-detail__arrow' aria-hidden='true' onClick={onBack}></i>
        </div>
        <div className='book-detail__info'>
          {categories && categories.length > 0 && <p className='book-detail__categories'>{categories.join(', ')}</p>}
          <h2 className='book-detail__title'>{title}</h2>
          <div className='book-detail__rating-separator'>
            <span>Average Rating:</span>
            <div style={{ display: 'inline', marginLeft: 5 }}>
              {renderStars(averageRating)}
              <span className='rating-number'>({averageRating ? averageRating.toFixed(2) : '0.00'})</span>
            </div>
          </div>
          {authors && authors.length > 0 && (
            <p className='book-detail__authors'>
              {authors.map((author, index) => (
                <span key={index} className='book-detail__author-name' onClick={() => handleAuthorClick(author)}>
                  {author}
                  {index < authors.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
          <div className='book-detail__description'>
            <p className={description ? 'book-detail__description-text' : ''}>{description}</p>
          </div>
          {isAuthenticated && (
            <div className='book-detail__rating-separator'>
              <span>Your Rating:</span>
              <div style={{ display: 'inline', marginLeft: 5 }}>{renderStars(selectedRating, hoverRating > 0, true)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetail
