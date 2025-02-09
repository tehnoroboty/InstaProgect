import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

export type RequestStatus = 'idle' | 'loading' | 'succeeded'

export const appSlice = createSlice({
  extraReducers: bulder => {
    bulder
      .addMatcher(isPending, state => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, state => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, state => {
        state.status = 'idle'
      })
  },
  initialState: {
    error: null as null | string,
    isLoggedIn: false,
    status: 'idle' as RequestStatus,
  },
  name: 'app',
  reducers: create => ({
    setAppError: create.reducer<{ error: null | string }>((state, action) => {
      state.error = action.payload.error
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  selectors: {
    selectAppError: state => state.error,
    selectIsLoggedIn: state => state.isLoggedIn,
  },
})

export const { setAppError, setIsLoggedIn } = appSlice.actions
export const { selectAppError, selectIsLoggedIn } = appSlice.selectors
export const appReducer = appSlice.reducer
