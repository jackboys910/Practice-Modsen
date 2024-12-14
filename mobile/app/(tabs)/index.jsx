import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import BookSearch from '../../components/BookSearch'
import FeedbackModal from '../../components/FeedbackModal'

function MainPage() {
  const { user } = useSelector((state) => state.user)
  const { userRating } = useSelector((state) => state.rating)
  const { hasSubmittedFeedback } = useSelector((state) => state.feedback)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [ratingCount, setRatingCount] = useState(0)

  useEffect(() => {
    if (user && userRating > 0) {
      setRatingCount((prev) => prev + 1)
    }
  }, [userRating])

  useEffect(() => {
    setRatingCount(0)
  }, [])

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
    <View style={styles.main}>
      <BookSearch />
      {showFeedbackModal && <FeedbackModal onClose={handleCloseModal} />}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MainPage
