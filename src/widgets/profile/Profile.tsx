'use client'
import React, {useEffect, useState} from 'react'
import {useMeQuery} from '@/src/shared/model/api/authApi'
import {
    SortDirection,
} from '@/src/shared/model/api/types'
import {ProfileInfo} from '@/src/widgets/profile/profileInfo/ProfileInfo'
import clsx from 'clsx'
import {useParams} from 'next/navigation'

import s from './myProfile.module.scss'
import {useGetUserProfileQuery} from "@/src/shared/model/api/usersApi";
import {useGetPostsQuery} from "@/src/shared/model/api/postsApi";
import {Posts} from "@/src/shared/ui/postsGrid/Posts";
import {useInView} from "react-intersection-observer";

const AUTH_PAGE_SIZE = 8
const PUBLIC_PAGE_SIZE = 12
const SORT_BY = 'createdAt'
const SORT_DIRECTION: SortDirection = 'desc'

type Props = {}

// @ts-ignore
export const Profile = (props: Props) => {
    const {inView, ref} = useInView({threshold: 1})
    const params = useParams<{ userId: string }>()

    const {data: meData} = useMeQuery()
    const authProfile = !!meData

    const isMyProfile = meData?.userId === Number(params.userId)

    // получаем информацию профайл
    const {data: profile, isFetching: isFetchingUserProfile} = useGetUserProfileQuery(
        Number(params.userId),
        // {
        //     skip: !meData || isMyProfile,
        // }
    )

    const [lastPostId, setLastPostId] = useState<number | null>(null)

    // получаем посты
    const {data: posts, isFetching: isFetchingPosts} = useGetPostsQuery(
        {
            userId: Number(params.userId),
            pageSize: AUTH_PAGE_SIZE,
            endCursorPostId: lastPostId || undefined,
            sortBy: SORT_BY,
            sortDirection: SORT_DIRECTION,
        },
    )
    console.log(posts)
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

    return (
        <div className = {clsx(s.page, [!authProfile && s.noAuthPage])}>
            <ProfileInfo authProfile = {authProfile} isMyProfile = {isMyProfile} profile = {profile}/>
            {isFetchingPosts && <div>Loading ...</div>}
            {!posts ? <div>Пусто</div> : <Posts posts = {posts.items}/>}
            {isMyProfile && hasMorePosts && (
                <div className = {s.loadMore} ref = {ref}>
                </div>
            )}
        </div>
    )
}
