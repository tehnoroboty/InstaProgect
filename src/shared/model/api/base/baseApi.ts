import { baseQueryWithReauth } from '@/src/shared/model/api/base/baseQueryWithReauth'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth, // Используем кастомный baseQuery
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: [
    'ME',
    'POSTS',
    'POST',
    'FOLLOWING',
    'COMMENTS',
    'PROFILE',
    'SESSIONS',
    'PAYMENTS',
    'NOTIFICATIONS',
    'FEED',
    'POST_LIKES',
    'COMMENT_LIKES',
    'ANSWER_LIKES',
    'ANSWERS',
    'MESSAGES',
  ],
})
