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
    isLoggedIn: false as boolean,
    status: 'idle' as RequestStatus,
    success: null as null | string,
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
    setAppSuccess: create.reducer<{ success: null | string }>((state, action) => {
      state.error = action.payload.success
    }),

    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setUserId: create.reducer<{ userId: null | number }>((state, action) => {
      state.userId = action.payload.userId
    }),
  }),
  selectors: {
    selectAppError: state => state.error,
    selectAppStatus: state => state.status,
    selectAppSuccess: state => state.success,
    selectIsLoggedIn: state => state.isLoggedIn,
    selectUserId: state => state.userId,
  },
})

export const { setAppError, setAppStatus, setAppSuccess, setUserId, setIsLoggedIn } = appSlice.actions
export const { selectAppError, selectAppStatus, selectAppSuccess, selectUserId, selectIsLoggedIn } =
  appSlice.selectors

export const appReducer = appSlice.reducer
