import { Post } from '@/src/entities/post/types'
import { baseApi } from '@/src/shared/model/api/baseApi'
import {
  GetCommentsResponse,
  GetMyPostsArgs,
  GetPostsResponse,
  GetPublicUserPostsArgs,
  GetPublicUserPostsResponse,
  ImageType,
  RequestPostsType,
  ResponsePostsType,
  SortDirection,
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
    getMyPosts: builder.query<GetPostsResponse, GetMyPostsArgs>({
      // providesTags: ['POSTS'],
      providesTags: (result, error, { userName }) => [{ id: userName, type: 'POSTS' }],
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
      providesTags: (result, error, { postId }) => [{ id: postId, type: 'POSTS' }],
      query: ({ postId }) => ({
        method: 'GET',
        url: `/posts/id/${postId}`,
      }),
    }),

    getPublicUserPosts: builder.query<GetPublicUserPostsResponse, GetPublicUserPostsArgs>({
      query: ({ endCursorPostId, pageSize, sortBy, sortDirection, userName }) => {
        const baseUrl = `posts/${userName}`
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
    removePost: builder.mutation<void, { postId: number; userName: string }>({
      invalidatesTags: ['POSTS'],
      // invalidatesTags: (result, error, { userName }) => [{ id: userName, type: 'POSTS' }],
      // ✅ Инвалидируем только посты этого пользователя

      async onQueryStarted({ postId, userName }, { dispatch, queryFulfilled }) {
        debugger
        const args = {
          // pageNumber: 1,
          pageSize: 10,
          sortBy: 'createdAt',
          sortDirection: 'desc' as SortDirection,
          userName,
        }

        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPublicUserPosts', args, draft => {
            // draft.items = draft.items.filter(post => post.id !== postId)
            const index = draft.items.findIndex(post => post.id === postId)

            if (index !== -1) {
              draft.items.splice(index, 1)
            }
          })
        )

        try {
          await queryFulfilled
          // dispatch(postsApi.util.invalidateTags([{ id: userName, type: 'POSTS' }]))
          // ✅ Теперь инвалидируем только кэш этого пользователя
        } catch {
          // Если запрос завершился с ошибкой, откатываем изменения в кэше
          patchResult?.undo()
        }
      },
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `/posts/${postId}`,
      }),
    }),

    updatePost: builder.mutation<void, { model: UpdatePostModel; postId: number }>({
      invalidatesTags: (result, err, { postId }) => [{ id: postId, type: 'POSTS' }],
      // Добавляем optimistic update:
      async onQueryStarted({ model, postId }, { dispatch, queryFulfilled }) {
        // Получаем текущее состояние поста
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getPost', { postId }, draft => {
            if (draft) {
              draft.description = model.description
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          // Если запрос не удался - откатываем изменения
          patchResult.undo()
        }
      },
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
  useRemovePostMutation,
  useUpdatePostMutation,
} = postsApi
