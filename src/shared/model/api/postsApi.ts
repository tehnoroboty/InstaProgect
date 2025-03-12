import { baseApi } from '@/src/shared/model/api/baseApi'
import {
  GetMyPostsArgs,
  GetMyPostsResponse,
  GetPublicUserPostsArgs,
  GetPublicUserPostsResponse,
  Image,
  RequestPostsType,
  ResponsePostsType,
} from '@/src/shared/model/api/types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createImageForPost: builder.mutation<{ images: Image }, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          body: formData,
          method: 'POST',
          url: 'posts/image',
        }
      },
    }),
    createNewPost: builder.mutation<ResponsePostsType, RequestPostsType>({
      query: body => ({
        body,
        method: 'POST',
        url: 'posts',
      }),
    }),
    getMyPosts: builder.query<GetMyPostsResponse, GetMyPostsArgs>({
      query: ({ pageNumber, pageSize, sortBy, sortDirection, userName }) => ({
        method: 'GET',
        params: {
          pageNumber,
          pageSize,
          sortBy,
          sortDirection,
        },
        url: `/posts/${userName}`,
      }),
    }),
    getPublicUserPosts: builder.query<GetPublicUserPostsResponse, GetPublicUserPostsArgs>({
      query: ({ endCursorPostId, pageSize, sortBy, sortDirection, userId }) => {
        const baseUrl = `/public-posts/user/${userId}`
        const cursorSegment = endCursorPostId ? `/${endCursorPostId}` : ''

        return {
          method: 'GET',
          params: {
            pageSize,
            sortBy,
            sortDirection,
          },
          url: `${baseUrl}${cursorSegment}`,
        }
      },
    }),
  }),
})

export const {
  useCreateImageForPostMutation,
  useCreateNewPostMutation,
  useGetMyPostsQuery,
  useGetPublicUserPostsQuery,
} = postsApi
