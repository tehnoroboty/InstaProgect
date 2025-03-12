import { baseApi } from '@/src/shared/model/api/baseApi'
import {
  GetMyPostsArgs,
  GetMyPostsResponse,
  Image,
  RequestPostsType,
  ResponsePostsType,
} from '@/src/shared/model/api/types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicUserProfile: builder.query<GetPublicUserProfileResponse, GetPublicUserProfileArgs>({
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
  }),
})

export const {} = postsApi
