import type { Meta, StoryObj } from '@storybook/react'

import { ModalCommentsSection } from '@/src/widgets/commentsSection/ModalCommentsSection'

const meta = {
  argTypes: {},
  args: {
    avatars: [
      {
        createdAt: '2025-02-19T11:58:19.531Z',
        fileSize: 300,
        height: 300,
        url: 'https://example.com/image1.jpg',
        width: 300,
      },
      {
        createdAt: '2025-02-19T11:58:19.531Z',
        fileSize: 300,
        height: 300,
        url: 'https://example.com/image2.jpg',
        width: 300,
      },
      {
        createdAt: '2025-02-19T11:58:19.531Z',
        fileSize: 300,
        height: 300,
        url: 'https://example.com/image3.jpg',
        width: 300,
      },
      {
        createdAt: '2025-02-19T11:58:19.531Z',
        fileSize: 300,
        height: 300,
        url: 'https://example.com/image4.jpg',
        width: 300,
      },
      {
        createdAt: '2025-02-19T11:58:19.531Z',
        fileSize: 300,
        height: 300,
        url: 'https://example.com/image5.jpg',
        width: 300,
      },
    ],
    commentsData: [
      {
        answerCount: 12,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores?',
        createdAt: '2025-01-19T11:10:15.847Z',
        from: {
          avatars: [{ url: 'http://avatar1' }],
          id: 1,
          username: 'Alex',
        },
        id: 1,
        isLiked: false,
        likeCount: 17,
        postId: 9,
      },
      {
        answerCount: 12,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores?',
        createdAt: '2025-01-19T11:10:15.847Z',
        from: {
          avatars: [{ url: 'http://avatar1' }],
          id: 1,
          username: 'Alex',
        },
        id: 1,
        isLiked: false,
        likeCount: 17,
        postId: 9,
      },
      {
        answerCount: 12,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores?',
        createdAt: '2025-01-19T11:10:15.847Z',
        from: {
          avatars: [{ url: 'http://avatar1' }],
          id: 1,
          username: 'Alex',
        },
        id: 1,
        isLiked: false,
        likeCount: 17,
        postId: 9,
      },
      {
        answerCount: 12,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores?',
        createdAt: '2025-01-19T11:10:15.847Z',
        from: {
          avatars: [{ url: 'http://avatar1' }],
          id: 1,
          username: 'Alex',
        },
        id: 1,
        isLiked: false,
        likeCount: 17,
        postId: 9,
      },
      {
        answerCount: 12,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores?',
        createdAt: '2025-01-19T11:10:15.847Z',
        from: {
          avatars: [{ url: 'http://avatar1' }],
          id: 1,
          username: 'Alex',
        },
        id: 1,
        isLiked: false,
        likeCount: 17,
        postId: 9,
      },
      {
        answerCount: 12,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores?',
        createdAt: '2025-01-19T11:10:15.847Z',
        from: {
          avatars: [{ url: 'http://avatar1' }],
          id: 1,
          username: 'Alex',
        },
        id: 1,
        isLiked: false,
        likeCount: 17,
        postId: 9,
      },
      {
        answerCount: 12,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores?',
        createdAt: '2025-01-19T11:10:15.847Z',
        from: {
          avatars: [{ url: 'http://avatar1' }],
          id: 1,
          username: 'Alex',
        },
        id: 1,
        isLiked: false,
        likeCount: 17,
        postId: 9,
      },
      {
        answerCount: 12,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad cum id illo, iste laudantium veritatis.',
        createdAt: '2025-02-19T11:58:19.847Z',
        from: {
          avatars: [{ url: 'http://avatar2' }],
          id: 2,
          username: 'Kate',
        },
        id: 2,
        isLiked: false,
        likeCount: 17,
        postId: 9,
      },
      {
        answerCount: 12,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus excepturi magnam voluptas?',
        createdAt: '2025-03-19T11:15:19.847Z',
        from: {
          avatars: [{ url: 'http://avatar3' }],
          id: 3,
          username: 'Andrew',
        },
        id: 3,
        isLiked: false,
        likeCount: 17,
        postId: 9,
      },
    ],
    post: {
      avatarOwner:
        'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
      avatarWhoLikes: true,
      createdAt: '2025-02-19T11:58:19.847Z',
      description: 'string',
      id: 12,
      images: [
        {
          createdAt: 'string',
          fileSize: 10,
          height: 15,
          uploadId: 'string',
          url: 'https://example.com/image10.jpg',
          width: 17,
        },
      ],
      isLiked: false,
      likesCount: 25,
      location: 'string',
      owner: {
        firstName: 'Alexander',
        lastName: 'Svistopliasov',
      },
      ownerId: 15,
      updatedAt: 'string',
      userName: 'Alex',
    },
  },
  component: ModalCommentsSection,
  tags: ['autodocs'],
  title: 'Components/ModalCommentsSection',
} satisfies Meta<typeof ModalCommentsSection>

export default meta
type Story = StoryObj<typeof ModalCommentsSection>

export const Default: Story = {}

export const LikedComments: Story = {
  args: {
    commentsData: [
      {
        answerCount: 12,
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores?',
        createdAt: '2025-01-19T11:10:15.847Z',
        from: {
          avatars: [{ url: 'http://avatar1' }],
          id: 1,
          username: 'Alex',
        },
        id: 1,
        isLiked: true,
        likeCount: 17,
        postId: 9,
      },
      {
        answerCount: 12,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad cum id illo, iste laudantium veritatis.',
        createdAt: '2025-02-19T11:58:19.847Z',
        from: {
          avatars: [{ url: 'http://avatar2' }],
          id: 2,
          username: 'Kate',
        },
        id: 2,
        isLiked: true,
        likeCount: 17,
        postId: 9,
      },
      {
        answerCount: 12,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus excepturi magnam voluptas?',
        createdAt: '2025-03-19T11:15:19.847Z',
        from: {
          avatars: [{ url: 'http://avatar3' }],
          id: 3,
          username: 'Andrew',
        },
        id: 3,
        isLiked: true,
        likeCount: 17,
        postId: 9,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of the Interaction Bar component with a comment icon.',
      },
    },
  },
}
