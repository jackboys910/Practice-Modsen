import { configureStore } from '@reduxjs/toolkit'

import feedbackReducer from './slices/feedbackSlice'
import profileReducer from './slices/profileSlice'
import ratingReducer from './slices/ratingSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    rating: ratingReducer,
    feedback: feedbackReducer,
  },
})

export default store
