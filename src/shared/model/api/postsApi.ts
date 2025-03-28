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
    removePost: builder.mutation<void, { postId: number }>({
      invalidatesTags: ['POSTS'],

      async onQueryStarted({ postId }, { dispatch, getState, queryFulfilled }) {
        // Получаем состояние RTK Query
        const state = getState()[postsApi.reducerPath]
        const args = state?.queries?.['getMyPosts']?.originalArgs as GetMyPostsArgs
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getMyPosts', args, state => {
            state.items = state.items.filter(post => post.id !== postId)
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }

        /*
                const state = getState()[postsApi.reducerPath]
        
                // Достаём параметры последнего запроса к getMyPosts
                const args = state?.queries?.['getMyPosts']?.originalArgs as GetMyPostsArgs | undefined
        
                // Если `args` отсутствует или в нём нет `userName`, прерываем обновление кэша
                if (!args) {
                  return
                }
        
                // Объявляем `patchResult` заранее
                let patchResult: ReturnType<typeof dispatch> | null = null
        
                try {
                  // Оптимистически удаляем пост из кэша
                  patchResult = dispatch(
                    postsApi.util.updateQueryData('getMyPosts', args, draft => {
                      draft.items = draft.items.filter(post => post.id !== postId)
                    })
                  )
        
                  // Дожидаемся выполнения запроса
                  await queryFulfilled
                } catch {
                  ;() => {}
                }
        */
      },
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `/posts/${postId}`,
      }),
    }),

    updatePost: builder.mutation<void, { model: UpdatePostModel; postId: number }>({
      invalidatesTags: (result, err, { postId }) => [{ id: postId, type: 'POSTS' }],
      // Добавляем optimistic update:
      async onQueryStarted({ model, postId }, { dispatch, getState, queryFulfilled }) {
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
