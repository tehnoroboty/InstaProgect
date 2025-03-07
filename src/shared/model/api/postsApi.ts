import { baseApi } from '@/src/shared/model/api/baseApi'
import { ImagesType, RequestPostsType, ResponsePostsType } from '@/src/shared/model/api/types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createImageForPost: builder.mutation<{ images: ImagesType }, { file: File }>({
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
      query: body => ({
        body,
        method: 'POST',
        url: 'posts',
      }),
    }),
  }),
})

export const { useCreateImageForPostMutation, useCreateNewPostMutation } = postsApi
