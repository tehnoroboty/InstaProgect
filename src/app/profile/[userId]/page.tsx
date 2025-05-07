import {Profile} from '@/src/widgets/profile/Profile'
import {
    SearchParams,
    getUserPosts,
} from '@/src/widgets/profile/getPublicProfile'

type Props = {
    params: { userId: string }
    searchParams: SearchParams
}

export default async function ProfilePage(props: Props) {
    const userPosts = await getUserPosts(props.params.userId)


    const profileDataFromServer = {
        posts: userPosts,
    }
    return <Profile profileDataFromServer = {profileDataFromServer}/>
}
