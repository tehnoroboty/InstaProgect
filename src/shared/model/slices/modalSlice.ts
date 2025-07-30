import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  initialState: {
    isPhotoOpen: false,
    isPostOpen: false,
  },
  name: 'modal',
  reducers: {
    setIsPhotoModalOpen: (state, action) => {
      state.isPhotoOpen = action.payload.isOpen
    },
    setIsPostModalOpen: (state, action) => {
      state.isPostOpen = action.payload.isOpen
    },
  },
  selectors: {
    selectIsPhotoModalOpen: state => state.isPhotoOpen,
    selectIsPostModalOpen: state => state.isPostOpen,
  },
})

export const { setIsPhotoModalOpen, setIsPostModalOpen } = modalSlice.actions
export const modalReducer = modalSlice.reducer
export const { selectIsPhotoModalOpen, selectIsPostModalOpen } = modalSlice.selectors
