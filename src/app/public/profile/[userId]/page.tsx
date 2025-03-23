import React from "react";

import {PublicProfileTypes} from "@/src/entities/user/types";
import {GetMyPostsResponse} from "@/src/shared/model/api/types";
import {PublicProfile} from "@/src/widgets/profile/PublicProfile/PublicProfile";

type Params = {
    userId: string,
}
type Props = {
    params: Params
}


const getUserProfile = async (userId: string): Promise<PublicProfileTypes> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-user/profile/${userId}`, {
        cache: 'no-store',

    })

    return await res.json()
}

const getUserPosts = async (userId: string): Promise<GetMyPostsResponse> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/user/${userId}`, {
        cache: 'no-store',
    })

    return await res.json()
}


export default async function PublicProfilePage({params}: Props) {

    const userProfile = await getUserProfile(params.userId)
    const userPosts = await getUserPosts(params.userId)


    return <>
        <PublicProfile userPosts = {userPosts} userProfile = {userProfile}/>
    </>


}
