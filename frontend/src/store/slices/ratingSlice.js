import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchAverageRatingAPI, fetchUserRatingAPI, submitBookRatingAPI } from '../../api/ratingAPI'

export const getAverageRating = createAsyncThunk('rating/getAverageRating', async (bookUri, { rejectWithValue }) => {
  const result = await fetchAverageRatingAPI(bookUri)
  if (result.success) return result.data
  return rejectWithValue(result.message)
})

export const getUserRating = createAsyncThunk('rating/getUserRating', async (bookUri, { rejectWithValue }) => {
  const result = await fetchUserRatingAPI(bookUri)
  if (result.success) return result.data
  return rejectWithValue(result.message)
})

export const setBookRating = createAsyncThunk('rating/setBookRating', async (ratingData, { rejectWithValue }) => {
  const result = await submitBookRatingAPI(ratingData)
  if (result.success) return result.data
  return rejectWithValue(result.message)
})

const ratingSlice = createSlice({
  name: 'rating',
  initialState: { averageRating: 0, userRating: 0, error: null },
  reducers: {
    clearRating(state) {
      state.userRating = 0
      state.averageRating = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAverageRating.fulfilled, (state, action) => {
        state.averageRating = action.payload.averageRating
      })
      .addCase(getUserRating.fulfilled, (state, action) => {
        state.userRating = action.payload.userRating
      })
      .addCase(setBookRating.fulfilled, (state, action) => {
        state.userRating = action.payload.userRating.rating
        state.averageRating = action.payload.averageRating
      })
  },
})

export const { clearRating } = ratingSlice.actions
export default ratingSlice.reducer
