import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  initialState: {
    isFollowersOpen: false,
    isFollowingOpen: false,
    isPhotoOpen: false,
    isPostOpen: false,
  },
  name: 'modal',
  reducers: {
    setIsFollowersModalOpen: (state, action) => {
      state.isFollowersOpen = action.payload.isOpen
    },
    setIsFollowingModalOpen: (state, action) => {
      state.isFollowingOpen = action.payload.isOpen
    },
    setIsPhotoModalOpen: (state, action) => {
      state.isPhotoOpen = action.payload.isOpen
    },
    setIsPostModalOpen: (state, action) => {
      state.isPostOpen = action.payload.isOpen
    },
  },
  selectors: {
    selectIsFollowersModalOpen: state => state.isFollowersOpen,
    selectIsFollowingModalOpen: state => state.isFollowingOpen,
    selectIsPhotoModalOpen: state => state.isPhotoOpen,
    selectIsPostModalOpen: state => state.isPostOpen,
  },
})

export const {
  setIsFollowersModalOpen,
  setIsFollowingModalOpen,
  setIsPhotoModalOpen,
  setIsPostModalOpen,
} = modalSlice.actions
export const modalReducer = modalSlice.reducer
export const {
  selectIsFollowersModalOpen,
  selectIsFollowingModalOpen,
  selectIsPhotoModalOpen,
  selectIsPostModalOpen,
} = modalSlice.selectors
