import { Post } from '@/src/entities/post/types'
import { baseApi } from '@/src/shared/model/api/baseApi'
import {
  AnswersComment,
  GetCommentsResponse,
  GetPostsArgs,
  GetPostsResponse,
  ImageType,
  RequestPostsType,
  ResponsePostsType,
  UpdatePostModel,
} from '@/src/shared/model/api/types'
import { setLastPostId } from '@/src/shared/model/slices/postsSlice'

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLastPostId({ lastPostId: null }))
        try {
          await queryFulfilled
        } catch (error) {
          console.error('Failed to create post:', error)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: 'posts',
      }),
    }),
    deletePost: builder.mutation<void, { postId: number; userId: number }>({
      async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPosts', { userId }, draft => {
            const index = draft.items.findIndex(post => post.id === postId)

            if (index !== -1) {
              draft.items.splice(index, 1)
            }
          })
        )

        try {
          await queryFulfilled // Ждем завершения запроса
        } catch {
          patchResult.undo() // Если запрос не удался, откатываем изменения
        }
      },
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `/posts/${postId}`,
      }),
    }),
    getComments: builder.query<GetCommentsResponse, number>({
      providesTags: (result, error, postId) => [{ id: postId, type: 'COMMENTS' }],
      query: postId => ({
        method: 'GET',
        url: `/posts/${postId}/comments`,
      }),
    }),
    getPost: builder.query<Post, number>({
      providesTags: res => (res ? [{ id: res.id, type: 'POST' }] : ['POST']),
      query: postId => ({
        method: 'GET',
        url: `/posts/id/${postId}`,
      }),
    }),
    getPosts: builder.query<GetPostsResponse, GetPostsArgs>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      merge: (currentCache, newItems) => {
        newItems.items.map(newItem => {
          const findIndex = currentCache.items.findIndex(
            currentItem => currentItem.id === newItem.id
          )

          if (findIndex === -1) {
            currentCache.items.push(newItem)
          }
        })
      },
      providesTags: (result, error, arg) => [{ type: 'POSTS', userId: arg.userId }],
      query: ({ endCursorPostId, pageSize, sortBy, sortDirection, userId }) => ({
        method: 'GET',
        params: {
          pageSize,
          sortBy,
          sortDirection,
        },
        url: `/public-posts/user/${userId}/${endCursorPostId}`,
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.userId
      },
      transformResponse: (response: GetPostsResponse) => {
        return response
      },
    }),
    updatePost: builder.mutation<void, { model: UpdatePostModel; postId: number }>({
      invalidatesTags: (_result, _err, { postId }) => [{ id: postId, type: 'POST' }],
      query: ({ model, postId }) => ({
        body: model,
        method: 'PUT',
        url: `/posts/${postId}`,
      }),
    }),
    addCommentAnswer: builder.mutation<
      AnswersComment,
      { postId: number; commentId: number; content: string }
    >({
      query: ({ postId, commentId, content }) => ({
        body: { content },
        method: 'POST',
        url: `/posts/${postId}/comments/${commentId}/answers`,
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'COMMENTS', id: postId }],
    }),
  }),
})

export const {
  useCreateImageForPostMutation,
  useCreateNewPostMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  useAddCommentAnswerMutation: useAddAnswerMutation,
} = postsApi
