import { Card } from '@/src/shared/ui/card/Card'
import { RegisteredUsersCounter } from '@/src/shared/ui/registeredUsersCounter/RegisteredUsersCounter'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { PublicFeedPost } from '@/src/widgets/publicFeedPost/PublicFeedPost'

import s from './publicFeed.module.scss'

const defaultPost = {
  avatarOwner: 'https://catastic.pet/wp-content/uploads/2022/10/clever-tuxedo-cat.jpg',
  avatarWhoLikes: false,
  createdAt: '2025-02-17T16:36:44.410Z',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo..',
  id: 1,
  images: [
    {
      createdAt: '2025-02-17T16:36:44.101Z',
      fileSize: 300,
      height: 300,
      uploadId: 'string',
      url: 'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg?format=2500w',
      width: 300,
    },
    {
      createdAt: '2025-02-17T16:36:44.101Z',
      fileSize: 300,
      height: 300,
      uploadId: 'string',
      url: 'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg?format=2500w',
      width: 300,
    },
    {
      createdAt: '2025-02-17T16:36:44.101Z',
      fileSize: 300,
      height: 300,
      uploadId: 'string',
      url: 'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg?format=2500w',
      width: 300,
    },
  ],
  isLiked: true,
  likesCount: 1,
  location: 'location',
  owner: {
    firstName: 'firstName',
    lastName: 'lastName',
  },
  ownerId: 1,
  updatedAt: '2025-02-17T16:36:44.410Z',
  userName: 'Alex',
}

export const PublicFeed = () => {
  const usersNumber = 1234

  return (
    <div className={s.container}>
      <div className={s.feed}>
        <Card className={s.registeredUsersContainer}>
          <Typography as={'h2'} option={'h2'}>{`Registered users:`}</Typography>
          <RegisteredUsersCounter userCount={usersNumber} />
        </Card>
        <div className={s.postsContainer}>
          <PublicFeedPost post={defaultPost} />
          <PublicFeedPost post={defaultPost} />
          <PublicFeedPost post={defaultPost} />
          <PublicFeedPost post={defaultPost} />
        </div>
      </div>
    </div>
  )
}
