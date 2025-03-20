import { baseApi } from '@/src/shared/model/api/baseApi'
import {
  GetMyPostsArgs,
  GetMyPostsResponse,
  Image,
  RequestPostsType,
  ResponsePostsType,
} from '@/src/shared/model/api/types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createImageForPost: builder.mutation<
      { images: Image },
      {
        file: File
      }
    >({
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
      invalidatesTags: ['POSTS'],
      query: body => ({
        body,
        method: 'POST',
        url: 'posts',
      }),
    }),
    getMyPosts: builder.query<GetMyPostsResponse, GetMyPostsArgs>({
      providesTags: ['POSTS'],
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
  }),
})

export const { useCreateImageForPostMutation, useCreateNewPostMutation, useGetMyPostsQuery } =
  postsApi
