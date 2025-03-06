import type { Meta, StoryObj } from '@storybook/react'

import { ProtectedFeedPost } from '@/src/widgets/protectedFeedPost/ProtectedFeedPost'

const meta = {
  argTypes: {},
  component: ProtectedFeedPost,
  tags: ['autodocs'],
  title: 'Components/ProtectedFeedPost',
} satisfies Meta<typeof ProtectedFeedPost>

export default meta
type Story = StoryObj<typeof ProtectedFeedPost>

export const Default: Story = {
  args: {
    avatarOwner: 'https://catastic.pet/wp-content/uploads/2022/10/clever-tuxedo-cat.jpg',
    avatarWhoLikes: false,
    createdAt: '2025-02-17T16:36:44.410Z',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
    likesCount: 3,
    location: 'location',
    owner: {
      firstName: 'firstName',
      lastName: 'lastName',
    },
    ownerId: 1,
    updatedAt: '2025-02-17T16:36:44.410Z',
    userName: 'AlexMeowlex',
  },
}
