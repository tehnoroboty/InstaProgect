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

    // getPublicUserPosts: builder.query<GetPublicUserPostsResponse, GetPublicUserPostsArgs>({
    getPublicUserPosts: builder.query<any[], GetPublicUserPostsArgs>({
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      // Мерж данных в кэш
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems)
      },
      // Обновляем данные только при изменении аргументов (например, при изменении endCursorPostId)
      providesTags: ['POSTS'],
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
      // какие бы не приходили query пораметры смотри только на URL и пихай все в один большой кэш
      // Обработка ответа от сервера
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      //а раз я использую transformResponse: (response: GetPublicUserPostsResponse, meta, arg) => {
      //     return response.items
      //   },
      transformResponse: (response: any, meta, arg) => {
        return response.items
      },
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
  useUpdatePostMutation,
} = postsApi
