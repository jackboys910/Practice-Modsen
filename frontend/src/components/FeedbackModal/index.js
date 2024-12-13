import './index.css'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { submitFeedback } from '../../store/slices/feedbackSlice'

const FeedbackModal = ({ onClose }) => {
  const [isUseful, setIsUseful] = useState(null)
  const [suggestion, setSuggestion] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (isUseful !== null) {
      dispatch(
        submitFeedback({
          isUseful,
          suggestion,
        }),
      )
      onClose()
    }
  }

  return (
    <div className='feedback-modal'>
      <div className='feedback-modal__content'>
        <div className='feedback-modal__header'>
          <h2>Feedback</h2>
          <button className='feedback-modal__close' onClick={onClose}>
            ❌
          </button>
        </div>
        <div className='feedback-modal__body'>
          <p>Do you find our site useful?</p>
          <div className='feedback-modal__options'>
            <div
              className={`feedback-modal__option ${isUseful === true ? 'selected useful' : ''} yes-button`}
              onClick={() => setIsUseful(true)}
            >
              Yes
            </div>
            <div
              className={`feedback-modal__option ${isUseful === false ? 'selected not-useful' : ''} no-button`}
              onClick={() => setIsUseful(false)}
            >
              No
            </div>
          </div>
          <p style={{ marginBottom: 10 }}>What can we improve?</p>
          <textarea
            className='feedback-modal__textarea'
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder='Your feedback...'
          />
        </div>
        <div className='feedback-modal__footer'>
          <button className='feedback-modal__submit' onClick={handleSubmit} disabled={isUseful === null}>
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
