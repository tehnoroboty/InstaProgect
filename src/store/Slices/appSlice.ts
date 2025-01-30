import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  initialState: {
    error: null as null | string,
    isLoggedIn: false,
  },
  name: 'app',
  reducers: create => ({
    setAppError: create.reducer<{ error: null | string }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
  },
})

export const { setAppError, setIsLoggedIn } = appSlice.actions
export const { selectIsLoggedIn } = appSlice.selectors
export const appReducer = appSlice.reducer
