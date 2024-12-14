import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { submitFeedbackAPI } from '../../api/feedbackAPI'

export const submitFeedback = createAsyncThunk(
  'feedback/submitFeedback',
  async ({ isUseful, suggestion }, { rejectWithValue }) => {
    try {
      const response = await submitFeedbackAPI({ isUseful, suggestion })

      if (!response.success) {
        console.error('Feedback submission failed:', response.message)
        return rejectWithValue(response.message)
      }

      return response.data
    } catch (error) {
      console.error('Error in submitFeedback thunk:', error.message)
      return rejectWithValue(error.message)
    }
  }
)

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbacks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.feedbacks.push(action.payload)
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default feedbackSlice.reducer
