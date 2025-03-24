import { Post } from '@/src/entities/post/types'
import { baseApi } from '@/src/shared/model/api/baseApi'
import {
  GetCommentsResponse,
  GetMyPostsArgs,
  GetMyPostsResponse,
  GetPublicUserPostsArgs,
  GetPublicUserPostsResponse,
  ImageType,
  RequestPostsType,
  ResponsePostsType,
  UpdatePostModel,
} from '@/src/shared/model/api/types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createImageForPost: builder.mutation<{ images: ImageType }, { file: File }>({
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
    getComments: builder.query<GetCommentsResponse, { postId: number }>({
      query: ({ postId }) => ({
        method: 'GET',
        url: `/posts/${postId}/comments`,
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
    getPost: builder.query<Post, { postId: number }>({
      query: ({ postId }) => ({
        method: 'GET',
        url: `/posts/id/${postId}`,
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
    updatePost: builder.mutation<void, { model: UpdatePostModel; postId: number }>({
      query: ({ model, postId }) => ({
        body: model,
        method: 'PUT',
        url: `/posts/${postId}`,
      }),
    }),
  }),
})

export const {
  useCreateImageForPostMutation,
  useCreateNewPostMutation,
  useGetCommentsQuery,
  useGetMyPostsQuery,
  useGetPostQuery,
  useGetPublicUserPostsQuery,
  useUpdatePostMutation,
} = postsApi
