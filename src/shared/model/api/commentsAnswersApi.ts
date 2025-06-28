import { baseApi } from '@/src/shared/model/api/baseApi'
import { Comment } from '@/src/shared/model/api/types'

export const commentsAnswersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createNewComment: builder.mutation<Comment, { content: string; postId: number }>({
      invalidatesTags: (_result, _err, { postId }) => [{ id: postId, type: 'COMMENTS' }],
      query: ({ content, postId }) => ({
        body: { content },
        method: 'POST',
        url: `/posts/${postId}/comments`,
      }),
    }),
  }),
})

export const { useCreateNewCommentMutation } = commentsAnswersApi
