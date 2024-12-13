import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { submitFeedbackAPI } from '../../api/feedbackAPI'

export const submitFeedback = createAsyncThunk('feedback/submitFeedback', async (feedbackData, { rejectWithValue }) => {
  const result = await submitFeedbackAPI(feedbackData)
  if (result.success) return result.data
  return rejectWithValue(result.message)
})

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    hasSubmittedFeedback: false,
    error: null,
  },
  reducers: {
    resetFeedbackState(state) {
      state.hasSubmittedFeedback = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.fulfilled, (state) => {
        state.hasSubmittedFeedback = true
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { resetFeedbackState } = feedbackSlice.actions
export default feedbackSlice.reducer
