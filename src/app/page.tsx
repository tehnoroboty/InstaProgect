import { AuthWrapper } from '../features/authWrapper/AuthWrapper'
import { PublicFeedPost } from '../widgets/publicFeedPost/PublicFeedPost'

const PublicPosts = () => {
  return (
    <AuthWrapper>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {new Array(4).fill(0).map((i, index) => {
          return (
            <PublicFeedPost
              avatarOwner={''}
              avatarWhoLikes={false}
              createdAt={''}
              description={''}
              id={0}
              images={[]}
              isLiked={false}
              key={index}
              likesCount={0}
              location={''}
              owner={{
                firstName: '',
                lastName: '',
              }}
              ownerId={0}
              updatedAt={''}
              userName={''}
            />
          )
        })}
      </div>
    </AuthWrapper>
  )
}

export default PublicPosts
