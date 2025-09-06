import {
  type AnswersComment,
  Comment,
  type GetAnswersArg,
  type GetAnswersResponse,
  type GetCommentsResponse,
} from '@/src/entities/comments/types'
import { CustomerError } from '@/src/entities/errors/types'
import {
  GetAnswerLikesArgs,
  GetCommentLikesArgs,
  LikeStatus,
  LikeUser,
  PaginatedLikesResponse,
} from '@/src/entities/likes/types'
import { baseApi } from '@/src/shared/model/api/baseApi'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { RootState } from '@/src/shared/model/store/store'

export const commentsAnswersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addAnswer: builder.mutation<
      AnswersComment,
      { commentId: number; content: string; postId: number }
    >({
      invalidatesTags: (result, error, { commentId }) => [{ id: commentId, type: 'ANSWERS' }],
      query: ({ commentId, content, postId }) => ({
        body: { content },
        method: 'POST',
        url: `posts/${postId}/comments/${commentId}/answers`,
      }),
    }),
    createNewComment: builder.mutation<Comment, { content: string; postId: number }>({
      invalidatesTags: (_result, _err, { postId }) => [{ id: postId, type: 'COMMENTS' }],
      query: ({ content, postId }) => ({
        body: { content },
        method: 'POST',
        url: `posts/${postId}/comments`,
      }),
    }),
    getAnswerLikes: builder.query<PaginatedLikesResponse, GetAnswerLikesArgs>({
      providesTags: (_res, _err, { answerId }) => [{ id: answerId, type: 'ANSWER_LIKES' }],
      query: ({ answerId, commentId, postId }) => ({
        method: 'GET',
        url: `posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
      }),
    }),
    getCommentAnswers: builder.query<GetAnswersResponse, GetAnswersArg>({
      providesTags: (_res, _err, { commentId }) => [{ id: commentId, type: 'ANSWERS' }],
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
        url: `posts/${postId}/comments/${commentId}/likes`,
      }),
    }),
    getComments: builder.query<GetCommentsResponse, number>({
      providesTags: (_result, _error, postId) => [{ id: postId, type: 'COMMENTS' }],
      query: postId => ({
        method: 'GET',
        url: `posts/${postId}/comments`,
      }),
    }),
    updateAnswerLikeStatus: builder.mutation<
      void,
      { answerId: number; commentId: number; likeStatus: LikeStatus; postId: number }
    >({
      invalidatesTags: (_res, _err, { answerId }) => [{ id: answerId, type: 'ANSWER_LIKES' }],
      async onQueryStarted(
        { answerId, commentId, likeStatus, postId },
        { dispatch, getState, queryFulfilled }
      ) {
        const state = getState() as RootState
        const userId = state.app.userId

        if (!userId) {
          return
        }

        const optimisticUser: LikeUser = {
          avatars: [],
          createdAt: new Date().toISOString(),
          id: Date.now(),
          isFollowedBy: false,
          isFollowing: false,
          userId,
          userName: 'You',
        }

        const patchResult = dispatch(
          commentsAnswersApi.util.updateQueryData(
            'getAnswerLikes',
            { answerId, commentId, postId },
            draft => {
              const alreadyLiked = draft.items.some(user => user.userId === userId)

              if (alreadyLiked) {
                draft.items = draft.items.filter(user => user.userId !== userId)
                draft.totalCount -= 1
              } else if (likeStatus === 'LIKE') {
                draft.items.unshift(optimisticUser)
                draft.totalCount += 1
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch (err) {
          patchResult.undo()
          const error = err as CustomerError
          const errorMessage =
            error.data?.messages?.[0]?.message ||
            error.data?.error ||
            'Failed to update answer like'

          dispatch(setAppError({ error: errorMessage }))
        }
      },
      query: ({ answerId, commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
      }),
    }),
    updateCommentLikeStatus: builder.mutation<
      void,
      { commentId: number; likeStatus: LikeStatus; postId: number }
    >({
      invalidatesTags: (_res, _err, { commentId }) => [{ id: commentId, type: 'COMMENT_LIKES' }],
      async onQueryStarted(
        { commentId, likeStatus, postId },
        { dispatch, getState, queryFulfilled }
      ) {
        const state = getState() as RootState
        const userId = state.app.userId

        if (!userId) {
          return
        }

        const optimisticUser: LikeUser = {
          avatars: [],
          createdAt: new Date().toISOString(),
          id: Date.now(),
          isFollowedBy: false,
          isFollowing: false,
          userId,
          userName: 'You',
        }

        const patchResult = dispatch(
          commentsAnswersApi.util.updateQueryData(
            'getCommentLikes',
            { commentId, postId },
            draft => {
              const alreadyLiked = draft.items.some(user => user.userId === userId)

              if (alreadyLiked) {
                draft.items = draft.items.filter(user => user.userId !== userId)
                draft.totalCount -= 1
              } else if (likeStatus === 'LIKE') {
                draft.items.unshift(optimisticUser)
                draft.totalCount += 1
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch (err) {
          patchResult.undo()
          const error = err as CustomerError
          const errorMessage =
            error.data?.messages?.[0]?.message ||
            error.data?.error ||
            'Failed to update comment like'

          dispatch(setAppError({ error: errorMessage }))
        }
      },
      query: ({ commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `posts/${postId}/comments/${commentId}/like-status`,
      }),
    }),
  }),
})

export const {
  useAddAnswerMutation,
  useCreateNewCommentMutation,
  useGetAnswerLikesQuery,
  useGetCommentLikesQuery,
  useGetCommentsQuery,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
} = commentsAnswersApi
