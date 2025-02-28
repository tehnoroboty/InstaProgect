import type { Meta, StoryObj } from '@storybook/react'

import { PublicFeedPost } from '@/src/widgets/publicFeedPost/PublicFeedPost'

const meta = {
  argTypes: {},
  component: PublicFeedPost,
  tags: ['autodocs'],
  title: 'Components/PublicFeedPost',
} satisfies Meta<typeof PublicFeedPost>

export default meta
type Story = StoryObj<typeof PublicFeedPost>

export const Default: Story = {
  args: {
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

export const SeveralImages: Story = {
  args: {
    ...Default.args,
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
  },
}

export const ShortDescription: Story = {
  args: {
    ...Default.args,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing',
  },
}

export const MultipleCards: Story = {
  args: {
    ...Default.args,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo..',
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
