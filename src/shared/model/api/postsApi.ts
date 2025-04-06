import {Post} from '@/src/entities/post/types'
import {baseApi} from '@/src/shared/model/api/baseApi'
import {
    GetCommentsResponse,
    GetMyPostsArgs,
    GetPostsResponse,
    ImageType,
    RequestPostsType,
    ResponsePostsType,
    UpdatePostModel,
} from '@/src/shared/model/api/types'

export const postsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        createImageForPost: builder.mutation<{ images: ImageType }, { file: File }>({
            query: ({file}) => {
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
            providesTags: ['COMMENTS'],
            query: ({postId}) => ({
                method: 'GET',
                url: `/posts/${postId}/comments`,
            }),
        }),
        getPosts: builder.query<GetPostsResponse, GetMyPostsArgs>({
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg
            },
            merge: (currentCache, newItems) => {
                currentCache.items.push(...newItems.items)
            },
            // Обновляем данные только при изменении аргументов (например, при изменении endCursorPostId)
            providesTags: (res) => (res ? res.items.map(({id}) => ({type: "POSTS", id})) : ["POSTS"]),
            query: ({endCursorPostId, pageSize, sortBy, sortDirection, userId}) => ({
                method: 'GET',
                params: {
                    pageSize,
                    sortBy,
                    sortDirection,
                },
                url: `/public-posts/user/${userId}/${endCursorPostId}`,
            }),
            serializeQueryArgs: ({endpointName}) => {
                return endpointName
            },
            transformResponse: (response: GetPostsResponse, meta, arg) => {
                return response
            },
        }),
        getPost: builder.query<Post, { postId: number }>({
            providesTags: (res) => (res ? [{type: "POST", id: res.id}] : ["POST"]),
            query: ({postId}) => ({
                method: 'GET',
                url: `/posts/id/${postId}`,
            }),
        }),
        updatePost: builder.mutation<void, { model: UpdatePostModel; postId: number }>({
            invalidatesTags: (result, err, {postId}) => [{id: postId, type: 'POST'}],
            query: ({model, postId}) => ({
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
    useGetPostQuery,
    useUpdatePostMutation,
    useGetPostsQuery,
} = postsApi
