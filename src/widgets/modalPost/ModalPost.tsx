import React, {useEffect, useState} from 'react'

import {Post} from '@/src/entities/post/types'
import {useGetCommentsQuery, useGetPostQuery} from '@/src/shared/model/api/postsApi'
import {GetCommentsResponse, ImageType} from '@/src/shared/model/api/types'
import {useGetUserProfileQuery} from '@/src/shared/model/api/usersApi'
import {Carousel} from '@/src/shared/ui/carousel/Carousel'
import {Dialog} from '@/src/shared/ui/dialog'
import {ModalCommentsSection} from '@/src/widgets/commentsSection/ModalCommentsSection'
import Image from 'next/image'
import {useParams, useSearchParams} from 'next/navigation'

import s from './modalPost.module.scss'
import ImageNotFound from "@/src/shared/assets/componentsIcons/ImageNotFound";

type Props = {
    onClose: () => void
    open: boolean
    publicComments?: GetCommentsResponse | null
    publicPost?: Post | null
}

export default function ModalPost(props: Props) {
    const {onClose, open} = props
    const [postPublicStatus, setPostPublicStatus] = useState<boolean>(true)
    const [isMyPost, setIsMyPost] = useState<boolean>(false)
    const params = useParams<{ userId: string }>()
    const searchParams = useSearchParams()
    const postId = searchParams.get('postId')
    const numericPostId = postId ? Number(postId) : null
    const queryParams = {postId: numericPostId!}
    const queryOptions = {skip: !numericPostId || !props.publicPost}
    const {data: profile} = useGetUserProfileQuery(Number(params.userId),
        {
            skip: !Number(params.userId),
        })
    const {data: authPost} = useGetPostQuery(queryParams, queryOptions)
    const {data: authComments} = useGetCommentsQuery(queryParams, queryOptions)

    useEffect(() => {
        setPostPublicStatus(!authPost)
    }, [authPost])

    useEffect(() => {
        const newValue = profile?.id === authPost?.ownerId
        setIsMyPost(prev => (prev !== newValue ? newValue : prev))
    }, [profile, authPost])
    const post = props.publicPost ? props.publicPost : authPost
    const comments = props.publicPost ? props.publicComments : authComments

    if (!post) {
        return null
    }
    const isCarousel = post.images.length > 1
    const renderItem = (item: ImageType) => {
        return item ?
            <Image alt = {'post'} className = {s.image} height = {490} src = {item.url} width = {562} priority/> :
            <div className = {s.notFound}>
                <ImageNotFound height = {194} width = {199}/>
                <div>
                    <b>No Image</b>
                </div>
            </div>
    }
    const commentsData = comments?.items ?? []

    return (
        <>
            <Dialog className = {s.dialog} closeClassName = {s.closeClassName} onClose = {onClose} open = {open}>
                <div className = {s.container}>
                    {isCarousel ? (
                        <Carousel list = {post.images} renderItem = {renderItem} size = {'large'}/>
                    ) : (
                        renderItem(post.images[0])
                    )}
                    <ModalCommentsSection
                        commentsData = {commentsData}
                        isMyPost = {isMyPost}
                        post = {post}
                        postPublicStatus = {postPublicStatus}
                    />
                </div>
            </Dialog>
        </>
    )
}
