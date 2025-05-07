'use client'
import React from 'react'

import {useMeQuery} from '@/src/shared/model/api/authApi'

import {GetPostsResponse} from '@/src/shared/model/api/types'
import {useAppDispatch} from '@/src/shared/model/store/store'
import {Posts} from '@/src/shared/ui/postsGrid/Posts'
import clsx from 'clsx'

import s from './myProfile.module.scss'
import {useParams} from "next/navigation";
import {Typography} from "@/src/shared/ui/typography/Typography";
import {useGetPosts} from "@/src/widgets/profile/useGetPosts";


type Props = {
    profileDataFromServer?: {
        posts: GetPostsResponse
    }
}

export const Profile = (props: Props) => {
    const {data: meData} = useMeQuery()
    const authProfile = !!meData
    const params = useParams<{ userId: string }>()
    const dispatch = useAppDispatch()

    const {ref, postsDataForRender, hasMorePosts} = useGetPosts({
        userId: params.userId,
        postsDataFromServer: props.profileDataFromServer?.posts,
        dispatch
    })

    return (
        <div className = {clsx(s.page, [!authProfile && s.noAuthPage])}>

            {!postsDataForRender ? <div>Пусто</div> : <Posts posts = {postsDataForRender}/>}
            {hasMorePosts && (
                <div className = {s.loadMore} ref = {ref}>
                    <Typography option = {'bold_text16'}>Loading...</Typography>
                </div>
            )}
        </div>
    )
}
