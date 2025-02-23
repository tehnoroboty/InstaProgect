import type { Meta, StoryObj } from '@storybook/react'

import { PublicFeedPost } from '@/src/components/publicFeedPost/PublicFeedPost'

const meta = {
  argTypes: {},
  component: PublicFeedPost,
  tags: ['autodocs'],
  title: 'Components/PublicFeedPost',
} satisfies Meta<typeof PublicFeedPost>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    avatarOwner:
      'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
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
        url: 'https://example.com/image.jpg',
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
  },
}

export const ShortDescription: Story = {
  args: {
    ...Default.args,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing',
  },
  render: args => {
    return (
      <>
        <div
          style={{
            display: 'grid',
            gap: '12px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
        >
          {Array.from({ length: 5 }).map((i, index) => {
            return <PublicFeedPost key={index} {...args} />
          })}
        </div>
      </>
    )
  },
}
