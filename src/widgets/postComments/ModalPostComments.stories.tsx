import type { Meta, StoryObj } from '@storybook/react'

import React from 'react'

import sliderImage from './assets/slider.jpg'
import ModalPostComments from '@/src/widgets/postComments/ModalPostComments'
import Image from 'next/image'

const meta = {
  argTypes: {},
  args: {
    list: [
      { id: 'slide1', img: sliderImage },
      { id: 'slide1', img: sliderImage },
      { id: 'slide1', img: sliderImage },
    ],
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
    renderItem: (item: any) => <Image alt={'image'} src={item.img} />,
  },
  component: ModalPostComments,
  tags: ['autodocs'],
  title: 'Components/ModalPostComments',
} satisfies Meta<typeof ModalPostComments>

export default meta
type Story = StoryObj<typeof ModalPostComments>

export const Default: Story = {}
