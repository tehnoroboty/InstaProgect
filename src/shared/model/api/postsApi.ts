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
            invalidatesTags: () => [{type: "POSTS"}],
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

            providesTags: ["POSTS"],
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
            forceRefetch: ({currentArg, previousArg}) =>
                currentArg?.postId !== previousArg?.postId,
        }),
        updatePost: builder.mutation<void, { model: UpdatePostModel; postId: number }>({
            invalidatesTags: (result, err, {postId}) => [{id: postId, type: 'POST'}],
            async onQueryStarted({model, postId}, {dispatch, getState, queryFulfilled}) {
                const patchResult = dispatch(
                    postsApi.util.updateQueryData('getPost', {postId}, draft => {
                        if (draft) {
                            draft.description = model.description
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            query: ({model, postId}) => ({
                body: model,
                method: 'PUT',
                url: `/posts/${postId}`,
            }),
        }),
        deletePost: builder.mutation<void, { postId: number, userId: number }>({
            async onQueryStarted({postId, userId}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    postsApi.util.updateQueryData('getPosts', {userId}, (draft) => {
                        const index = draft.items.findIndex(post => post.id === postId);
                        if (index !== -1) {
                            draft.items.splice(index, 1);
                        }
                    })
                );

                try {
                    await queryFulfilled; // Ждем завершения запроса
                } catch {
                    patchResult.undo(); // Если запрос не удался, откатываем изменения
                }
            },
            query: ({postId}) => ({
                method: 'DELETE',
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
    useDeletePostMutation
} = postsApi
