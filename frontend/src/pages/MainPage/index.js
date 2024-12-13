import './index.css'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import BookSearch from '../../components/BookSearch'
import FeedbackModal from '../../components/FeedbackModal'

function MainPage() {
  const { user } = useSelector((state) => state.user)
  const { userRating } = useSelector((state) => state.rating)
  const { hasSubmittedFeedback } = useSelector((state) => state.feedback)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [ratingCount, setRatingCount] = useState(0)

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (user && userRating > 0) {
      setRatingCount((prev) => prev + 1)
    }
  }, [userRating])

  useEffect(() => {
    setRatingCount(0)
  }, [token])

  useEffect(() => {
    if (!!hasSubmittedFeedback && ratingCount > 0 && ratingCount % 10 === 0) {
      setShowFeedbackModal(true)
    }

    if (ratingCount % 3 === 0 && ratingCount > 0 && !hasSubmittedFeedback) {
      setShowFeedbackModal(true)
    }
  }, [ratingCount, hasSubmittedFeedback])

  const handleCloseModal = () => {
    setShowFeedbackModal(false)
  }

  return (
    <div className='main'>
      <BookSearch />
      {showFeedbackModal && <FeedbackModal onClose={handleCloseModal} />}
    </div>
  )
}

export default MainPage
