import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  initialState: {
    isOpen: false,
  },
  name: 'modal',
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isOpen = action.payload.isOpen
    },
  },
  selectors: {
    selectIsModalOpen: state => state.isOpen,
  },
})

export const { setIsModalOpen } = modalSlice.actions
export const modalReducer = modalSlice.reducer
export const { selectIsModalOpen } = modalSlice.selectors
