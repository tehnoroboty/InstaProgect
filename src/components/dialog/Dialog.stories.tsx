import React, { useState } from 'react'

import { Typography } from '@/src/components/typography/Typography'
import { Meta, StoryObj } from '@storybook/react'

import s from './dialog.module.scss'

import { Button } from '../button/Button'
import { Dialog, DialogProps } from './Dialog'
import { mockData, mockText } from './mock'

const meta = {
  argTypes: {},
  args: {},
  component: Dialog,
  tags: ['autodocs'],
  title: 'Components/Dialog',
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof Dialog>

const DialogWrapper = (props: DialogProps) => {
  const [value, setValue] = useState(mockData)

  const [showDialog, setShowDialog] = useState(false)

  const openModalHandler = () => {
    setShowDialog(true)
  }

  const closeModalHandler = () => {
    setShowDialog(false)
  }

  return (
    <>
      <div className={s.headerWrapper}>
        <div className={s.container}>
          <h3>logotype</h3>
          <Button onClick={openModalHandler}>Sign Up</Button>
        </div>
      </div>
      <Dialog modalTitle={mockData[0].modalTitle} onClose={closeModalHandler} open={showDialog}>
        <div className={s.boxDiscription}>
          <div className={s.image}></div>
          <Typography option={'regular_text16'}>{mockData[0].modalDescription}</Typography>
        </div>
        <div className={s.boxButton}>
          <Button onClick={closeModalHandler} variant={'bordered'}>
            Yes
          </Button>
          <Button onClick={closeModalHandler}>No</Button>
        </div>
      </Dialog>
      <div className={s.lorem}>{mockText}</div>
    </>
  )
}

export const DeleteFollowing: Story = {
  render: args => <DialogWrapper {...args} />,
}
