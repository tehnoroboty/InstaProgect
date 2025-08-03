import type { Meta, StoryObj } from '@storybook/react'

import { ModalCommentsSection } from '@/src/widgets/commentsSection/ModalCommentsSection'

const meta = {
  argTypes: {},
  args: {
    post: {
      avatarOwner:
        'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
      avatarWhoLikes: [],
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
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of the Interaction Bar component with a comments icon.',
      },
    },
  },
}
