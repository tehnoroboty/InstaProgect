import type {
  AnswersComment,
  GetAnswersArg,
  GetAnswersResponse,
  GetCommentsResponse,
} from '@/src/entities/comments/types'

import {
  GetAnswerLikesArgs,
  GetCommentLikesArgs,
  GetLikesArgs,
  LikeStatus,
  PaginatedLikesResponse,
  UpdateLikeStatusModel,
} from '@/src/entities/likes/types'
import {
  GetFolloweePostsArgs,
  GetFolloweePostsResponse,
  GetPostsArgs,
  GetPostsResponse,
  ImageType,
  Post,
  RequestPostsType,
  ResponsePostsType,
  UpdatePostModel,
} from '@/src/entities/post/types'
import { baseApi } from '@/src/shared/model/api/baseApi'
import { setLastPostId } from '@/src/shared/model/slices/postsSlice'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addAnswer: builder.mutation<
      AnswersComment,
      { commentId: number; content: string; postId: number }
    >({
      invalidatesTags: (result, error, { postId }) => [{ id: postId, type: 'COMMENTS' }],
      query: ({ commentId, content, postId }) => ({
        body: { content },
        method: 'POST',
        url: `/posts/${postId}/comments/${commentId}/answers`,
      }),
    }),
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
    getAnswerLikes: builder.query<PaginatedLikesResponse, GetAnswerLikesArgs>({
      providesTags: (_res, _err, { answerId }) => [{ id: answerId, type: 'ANSWER_LIKES' }],
      query: ({ answerId, commentId, postId }) => ({
        method: 'GET',
        url: `/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
      }),
    }),
    getCommentAnswers: builder.query<GetAnswersResponse, GetAnswersArg>({
      query: ({
        commentId,
        pageNumber = 1,
        pageSize = 100,
        postId,
        sortBy = 'createdAt',
        sortDirection = 'asc',
      }) =>
        `/posts/${postId}/comments/${commentId}/answers?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
    }),
    getCommentLikes: builder.query<PaginatedLikesResponse, GetCommentLikesArgs>({
      providesTags: (_res, _err, { commentId }) => [{ id: commentId, type: 'COMMENT_LIKES' }],
      query: ({ commentId, postId }) => ({
        method: 'GET',
        url: `/posts/${postId}/comments/${commentId}/likes`,
      }),
    }),
    getComments: builder.query<GetCommentsResponse, number>({
      providesTags: (_result, _error, postId) => [{ id: postId, type: 'COMMENTS' }],
      query: postId => ({
        method: 'GET',
        url: `/posts/${postId}/comments`,
      }),
    }),
    getFolloweePosts: builder.query<GetFolloweePostsResponse, GetFolloweePostsArgs>({
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
      // providesTags: 'FEED',
      query: ({ endCursorPostId, pageNumber, pageSize }) => ({
        method: 'GET',
        params: {
          endCursorPostId,
          pageNumber,
          pageSize,
        },
        url: `/home/publications-followers`,
      }),
    }),
    getPost: builder.query<Post, number>({
      providesTags: res => (res ? [{ id: res.id, type: 'POST' }] : ['POST']),
      query: postId => ({
        method: 'GET',
        url: `/posts/id/${postId}`,
      }),
    }),
    getPostLikes: builder.query<PaginatedLikesResponse, GetLikesArgs>({
      providesTags: (_result, _error, { postId }) => [{ id: postId, type: 'POST_LIKES' }],
      query: ({ cursor, pageNumber, pageSize, postId, search }) => ({
        method: 'GET',
        params: {
          cursor,
          pageNumber,
          pageSize,
          search,
        },
        url: `/posts/${postId}/likes`,
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
      providesTags: (_result, _error, arg) => [{ type: 'POSTS', userId: arg.userId }],
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
    updateAnswerLikeStatus: builder.mutation<
      void,
      { answerId: number; commentId: number; likeStatus: LikeStatus; postId: number }
    >({
      invalidatesTags: (_res, _err, { answerId }) => [{ id: answerId, type: 'ANSWER_LIKES' }],
      query: ({ answerId, commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
      }),
    }),
    updateCommentLikeStatus: builder.mutation<
      void,
      { commentId: number; likeStatus: LikeStatus; postId: number }
    >({
      invalidatesTags: (_res, _err, { commentId }) => [{ id: commentId, type: 'COMMENT_LIKES' }],
      query: ({ commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `/posts/${postId}/comments/${commentId}/like-status`,
      }),
    }),
    updateLikeStatusPost: builder.mutation<void, { model: UpdateLikeStatusModel; postId: number }>({
      invalidatesTags: (_result, _err, { postId }) => [
        { id: postId, type: 'POST' },
        {
          id: postId,
          type: 'POST_LIKES',
        },
      ],
      query: ({ model, postId }) => ({
        body: model,
        method: 'PUT',
        url: `/posts/${postId}/like-status`,
      }),
    }),
    updatePost: builder.mutation<void, { model: UpdatePostModel; postId: number }>({
      invalidatesTags: (_result, _err, { postId }) => [{ id: postId, type: 'POST' }],
      query: ({ model, postId }) => ({
        body: model,
        method: 'PUT',
        url: `/posts/${postId}`,
      }),
    }),
  }),
})

export const {
  useAddAnswerMutation,
  useCreateImageForPostMutation,
  useCreateNewPostMutation,
  useDeletePostMutation,
  useGetAnswerLikesQuery,
  useGetCommentLikesQuery,
  useGetCommentsQuery,
  useGetFolloweePostsQuery,
  useGetPostLikesQuery,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
  useUpdateLikeStatusPostMutation,
  useUpdatePostMutation,
} = postsApi
