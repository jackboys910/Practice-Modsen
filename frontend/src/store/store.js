import { configureStore } from '@reduxjs/toolkit'

import favoritesReducer from './slices/favoritesSlice'
import feedbackReducer from './slices/feedbackSlice'
import profileReducer from './slices/profileSlice'
import quizReducer from './slices/quizSlice'
import ratingReducer from './slices/ratingSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    rating: ratingReducer,
    feedback: feedbackReducer,
    favorites: favoritesReducer,
    quiz: quizReducer,
  },
})

export default store
