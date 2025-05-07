import './index.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { QUESTIONS } from '../../constants/quizQuestions'
import { setAnswer, setCurrentQuestion } from '../../store/slices/quizSlice'

const QuizPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentQuestion, selectedAnswers } = useSelector((state) => state.quiz)

  const [recommendations, setRecommendations] = useState([])

  const questionData = QUESTIONS[currentQuestion - 1]

  const handleAnswerClick = (answer) => {
    dispatch(setAnswer({ question: currentQuestion, answer }))
    const selected = questionData.answers.find((a) => a.text === answer)
    setRecommendations(selected?.recommendations || [])
  }

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion <= QUESTIONS.length) {
      dispatch(setCurrentQuestion(nextQuestion))
    } else {
      navigate('/')
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      dispatch(setCurrentQuestion(currentQuestion - 1))
    }
  }

  const handleSearchBook = (book) => {
    navigate('/', { state: { searchQuery: book } })
  }

  useEffect(() => {
    const selected = questionData?.answers.find((answer) => answer.text === selectedAnswers[currentQuestion])
    setRecommendations(selected?.recommendations || [])
  }, [currentQuestion, selectedAnswers])

  return (
    <div className='quiz-page'>
      <h1>
        Вопрос {currentQuestion} из {QUESTIONS.length}
      </h1>
      <p className='quiz-page__question'>{questionData.question}</p>
      <div className='quiz-page__answers'>
        {questionData.answers.map((answer, index) => (
          <button
            key={index}
            className={`quiz-page__answer ${selectedAnswers[currentQuestion] === answer.text ? 'quiz-page__answer--selected' : ''}`}
            onClick={() => handleAnswerClick(answer.text)}
          >
            {answer.text}
          </button>
        ))}
      </div>
      <div className='quiz-page__navigation'>
        <button onClick={handlePrevious} disabled={currentQuestion === 1}>
          Назад
        </button>
        <button onClick={handleNext}>{currentQuestion === QUESTIONS.length ? 'Завершить' : 'Вперёд'}</button>
      </div>
      {recommendations.length > 0 && (
        <div className='quiz-page__recommendations'>
          <h3>По вашему ответу мы определили, что возможно Вам будут интересны следующие книги:</h3>
          <div className='quiz-page__recommendations-list'>
            {recommendations.map((book, index) => (
              <div key={index} className='quiz-page__recommendation' onClick={() => handleSearchBook(book)}>
                {book}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizPage
