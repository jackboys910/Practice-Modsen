import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentQuestion: 1,
  selectedAnswers: {},
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuestion(state, action) {
      state.currentQuestion = action.payload
    },
    setAnswer(state, action) {
      const { question, answer } = action.payload
      state.selectedAnswers[question] = answer
    },
    resetQuiz(state) {
      state.currentQuestion = 1
      state.selectedAnswers = {}
    },
  },
})

export const { setCurrentQuestion, setAnswer, resetQuiz } = quizSlice.actions
export default quizSlice.reducer
