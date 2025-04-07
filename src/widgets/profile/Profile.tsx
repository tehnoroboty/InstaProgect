'use client'
import React, {useCallback, useEffect, useState} from 'react'
import {useMeQuery} from '@/src/shared/model/api/authApi'
import {
    SortDirection,
} from '@/src/shared/model/api/types'
import {ProfileInfo} from '@/src/widgets/profile/profileInfo/ProfileInfo'
import clsx from 'clsx'
import {useParams, useRouter, useSearchParams} from 'next/navigation'

import s from './myProfile.module.scss'
import {useGetUserProfileQuery} from "@/src/shared/model/api/usersApi";
import {useGetCommentsQuery, useGetPostQuery, useGetPostsQuery} from "@/src/shared/model/api/postsApi";
import {Posts} from "@/src/shared/ui/postsGrid/Posts";
import {useInView} from "react-intersection-observer";
import ModalPost from "@/src/widgets/modalPost/ModalPost";

const AUTH_PAGE_SIZE = 8
const PUBLIC_PAGE_SIZE = 12
const SORT_BY = 'createdAt'
const SORT_DIRECTION: SortDirection = 'desc'

type Props = {}

// @ts-ignore
export const Profile = (props: Props) => {
    const {inView, ref} = useInView({threshold: 1})
    const params = useParams<{ userId: string }>()
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [lastPostId, setLastPostId] = useState<number | null>(null)
    const router = useRouter()
    const {data: meData} = useMeQuery()
    const authProfile = !!meData
    const searchParams = useSearchParams()
    const postId = searchParams.get('postId')
    const isMyProfile = meData?.userId === Number(params.userId)
    // получаем информацию профайл
    const {data: profile,} = useGetUserProfileQuery(
        Number(params.userId),
        {
            skip: !Number(params.userId),
        }
    )


    // получаем посты
    const {data: posts, isFetching: isFetchingPosts} = useGetPostsQuery(
        {
            userId: Number(params.userId),
            pageSize: AUTH_PAGE_SIZE,
            endCursorPostId: lastPostId || undefined,
            sortBy: SORT_BY,
            sortDirection: SORT_DIRECTION,
        },
        {refetchOnMountOrArgChange: true}
    )
    const totalCount = posts?.totalCount ?? AUTH_PAGE_SIZE
    const postsCount = posts?.items.length ?? totalCount
    const hasMorePosts = totalCount > postsCount

    useEffect(() => {
        if (hasMorePosts && inView && isMyProfile && !isFetchingPosts) {
            if (posts) {
                setLastPostId(posts.items[posts.items.length - 1].id)
            }
        }
    }, [inView, isFetchingPosts, isMyProfile])
    // получаем пост по ID
    const {data: post, isFetching: isFetchingPost} = useGetPostQuery({postId: Number(postId)},
        {
            skip: !postId,
        })
    // получаем комменты по ID
    const {data: comments, isFetching: isFetchingComments} = useGetCommentsQuery({postId: Number(postId)}, {
        skip: !postId,
    })

    const closeModal = useCallback(() => {
        setModalIsOpen(false)
        router.replace(`/profile/${params.userId}`, {scroll: false})
    }, [router, params.userId])
    useEffect(() => {
        if (postId) {
            setModalIsOpen(true)
        } else {
            closeModal()
        }
    }, [closeModal, postId])

    return (
        <div className = {clsx(s.page, [!authProfile && s.noAuthPage])}>
            <ProfileInfo authProfile = {authProfile} isMyProfile = {isMyProfile} profile = {profile}/>
            {isFetchingPosts && <div>Loading ...</div>}
            {!posts ? <div>Пусто</div> : <Posts posts = {posts.items}/>}
            {isMyProfile && hasMorePosts && (
                <div className = {s.loadMore} ref = {ref}>
                </div>
            )}
            <ModalPost
                publicPost = {post}
                publicComments = {comments}
                onClose = {closeModal}
                open = {modalIsOpen}
            />
        </div>
    )
}
