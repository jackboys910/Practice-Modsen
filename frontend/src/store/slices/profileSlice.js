import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProfileAPI, resetProfileAPI, updateProfileAPI } from '../../api/profileAPI'

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { rejectWithValue }) => {
  const result = await fetchProfileAPI()
  if (result.success) {
    return result.data
  } else {
    return rejectWithValue(result.message)
  }
})

export const updateProfile = createAsyncThunk('profile/updateProfile', async (formData, { rejectWithValue }) => {
  const result = await updateProfileAPI(formData)
  if (result.success) {
    return result.data
  } else {
    return rejectWithValue(result.message)
  }
})

export const resetProfile = createAsyncThunk('profile/resetProfile', async (_, { rejectWithValue }) => {
  const result = await resetProfileAPI()
  if (result.success) {
    return result.data
  } else {
    return rejectWithValue(result.message)
  }
})

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(resetProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(resetProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default profileSlice.reducer
