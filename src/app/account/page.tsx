import { AuthWrapper } from '@/src/features/authWrapper/AuthWrapper'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'

const AccountPosts = () => {
  return (
    <AuthWrapper>
      <Posts posts={[]} />
    </AuthWrapper>
  )
}

export default AccountPosts
