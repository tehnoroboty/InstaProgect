import {
  type AnswersComment,
  Comment,
  type GetAnswersArg,
  type GetAnswersResponse,
  type GetCommentsResponse,
} from '@/src/entities/comments/types'
import {
  GetAnswerLikesArgs,
  GetCommentLikesArgs,
  LikeStatus,
  LikeUser,
  PaginatedLikesResponse,
} from '@/src/entities/likes/types'
import { baseApi } from '@/src/shared/model/api/baseApi'
import { usersApi } from '@/src/shared/model/api/usersApi'
import { RootState } from '@/src/shared/model/store/store'

export const commentsAnswersApi = baseApi.injectEndpoints({
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
    createNewComment: builder.mutation<Comment, { content: string; postId: number }>({
      invalidatesTags: (_result, _err, { postId }) => [{ id: postId, type: 'COMMENTS' }],
      query: ({ content, postId }) => ({
        body: { content },
        method: 'POST',
        url: `/posts/${postId}/comments`,
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

        // Предположим, что профиль уже загружен
        const profile = usersApi.endpoints.getMyProfile.select()(state).data

        if (!profile) {
          return
        }

        const patchResult = dispatch(
          commentsAnswersApi.util.updateQueryData(
            // обновляем кеш лайков этого ответа
            'getAnswerLikes',
            { answerId, commentId, postId },
            draft => {
              const alreadyLikedIndex = draft.items.findIndex(user => user.userId === userId)

              // Удаляем существующий лайк (если есть)
              if (alreadyLikedIndex !== -1) {
                draft.items.splice(alreadyLikedIndex, 1)
                draft.totalCount--
              }

              if (likeStatus === 'LIKE') {
                draft.items.unshift({
                  avatars: profile.avatars,
                  createdAt: new Date().toISOString(),
                  id: Date.now(), // временный ID, не используется
                  isFollowedBy: false,
                  isFollowing: false,
                  userId,
                  userName: profile.userName,
                })
                draft.totalCount++
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo() // если ошибка — откат
        }
      },
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
      async onQueryStarted(
        { commentId, likeStatus, postId },
        { dispatch, getState, queryFulfilled }
      ) {
        const state = getState() as RootState
        const userId = state.app.userId

        if (!userId) {
          return
        }

        const profile = usersApi.endpoints.getMyProfile.select()(state).data

        if (!profile) {
          return
        }

        const patchResult = dispatch(
          commentsAnswersApi.util.updateQueryData(
            'getCommentLikes',
            { commentId, postId },
            draft => {
              const existingIndex = draft.items.findIndex(
                (user: LikeUser) => user.userId === userId
              )

              // Удаляем, если лайк уже есть
              if (existingIndex !== -1) {
                draft.items.splice(existingIndex, 1)
                draft.totalCount--
              }

              // Добавляем, если ставим лайк
              if (likeStatus === 'LIKE') {
                draft.items.unshift({
                  avatars: profile.avatars ?? [],
                  createdAt: new Date().toISOString(),
                  id: Date.now(), // временный ID
                  isFollowedBy: false,
                  isFollowing: false,
                  userId,
                  userName: profile.userName,
                })
                draft.totalCount++
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: ({ commentId, likeStatus, postId }) => ({
        body: { likeStatus },
        method: 'PUT',
        url: `/posts/${postId}/comments/${commentId}/like-status`,
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
