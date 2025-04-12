import { createSlice } from '@reduxjs/toolkit'

export const postsSlice = createSlice({
  initialState: {
    lastPostId: null,
  },
  name: 'posts',
  reducers: {
    setLastPostId: (state, action) => {
      state.lastPostId = action.payload.lastPostId
    },
  },
  selectors: {
    selectLastPostId: state => state.lastPostId,
  },
})

export const { setLastPostId } = postsSlice.actions
export const postsReducer = postsSlice.reducer
export const { selectLastPostId } = postsSlice.selectors
