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
    status: 'idle' as RequestStatus,
    userId: null as null | number,
  },
  name: 'app',
  reducers: create => ({
    setAppError: create.reducer<{ error: null | string }>((state, action) => {
      state.error = action.payload.error
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setUserId: create.reducer<{ userId: null | number }>((state, action) => {
      state.userId = action.payload.userId
    }),
  }),
  selectors: {
    selectAppError: state => state.error,
    selectAppStatus: state => state.status,
    selectUserId: state => state.userId,
  },
})

export const { setAppError, setAppStatus, setUserId } = appSlice.actions
export const { selectAppError, selectAppStatus, selectUserId } = appSlice.selectors
export const appReducer = appSlice.reducer
