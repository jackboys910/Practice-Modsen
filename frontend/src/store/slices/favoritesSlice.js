import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { addFavorite, fetchFavorites, removeFavorite } from '../../api/favoritesAPI'

export const fetchUserFavorites = createAsyncThunk('favorites/fetchUserFavorites', async (_, { rejectWithValue }) => {
  const result = await fetchFavorites()
  if (result.success) {
    return result.data
  } else {
    return rejectWithValue(result.message)
  }
})

export const addUserFavorite = createAsyncThunk('favorites/addUserFavorite', async (book, { rejectWithValue }) => {
  const result = await addFavorite(book.id)
  if (result.success) {
    return book
  } else {
    return rejectWithValue(result.message)
  }
})

export const removeUserFavorite = createAsyncThunk('favorites/removeUserFavorite', async (bookUri, { rejectWithValue }) => {
  const result = await removeFavorite(bookUri)
  if (result.success) {
    return bookUri
  } else {
    return rejectWithValue(result.message)
  }
})

export const removeUserFavoriteHeart = createAsyncThunk('favorites/removeUserFavoriteHeart', async (bookUri, { rejectWithValue }) => {
  const result = await removeFavorite(bookUri)
  if (result.success) {
    return bookUri
  } else {
    return rejectWithValue(result.message)
  }
})

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFavorites.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        state.loading = false
        state.favorites = action.payload
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addUserFavorite.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addUserFavorite.fulfilled, (state, action) => {
        state.loading = false
        state.favorites.push(action.payload)
      })
      .addCase(addUserFavorite.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(removeUserFavorite.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeUserFavorite.fulfilled, (state, action) => {
        state.loading = false
        state.favorites = state.favorites.filter((book) => book.bookUri !== action.payload)
      })
      .addCase(removeUserFavorite.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(removeUserFavoriteHeart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeUserFavoriteHeart.fulfilled, (state) => {
        state.loading = false
        state.favorites = []
      })
      .addCase(removeUserFavoriteHeart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default favoritesSlice.reducer
