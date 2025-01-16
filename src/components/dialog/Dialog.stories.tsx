import { Meta, StoryObj } from '@storybook/react'
import { Dialog, DialogProps } from './Dialog'
import React, { useState } from 'react'
import { Button } from '../button/Button'
import s from './dialog.module.scss'
import { mockData, mockText } from './mock'
import { Typography } from '@/src/components/typography/Typography'

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
      <Dialog open={showDialog} onClose={closeModalHandler} modalTitle={mockData[0].modalTitle}>
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

/*
export const DialogUsage: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}
export const DialogPreview: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="bordered">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className={clsx(s.dialogContent)}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className={clsx(s.form)}>
          <div className={clsx(s.formRow)}>
            <Typography
              option={'regular_text14'}
              as={'label'}
              className={clsx(s.label)}
              htmlFor="name"
            >
              Name
            </Typography>
            <Input id="name" defaultValue="Pedro Duarte" className={clsx(s.input)} />
          </div>
          <div className={clsx(s.formRow)}>
            <Typography
              option={'regular_text14'}
              as={'label'}
              className={clsx(s.label)}
              htmlFor="username"
            >
              Name
            </Typography>
            <Input id="username" defaultValue="@peduarte" className={clsx(s.input)} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
*/

/*
export const DialogDemo: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="bordered" className={clsx(s.button, 'violet')}>
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className={clsx(s.overlay)} />
        <DialogContent className={clsx(s.content)}>
          <DialogHeader>
            <DialogTitle className={clsx(s.title)}>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className={clsx(s.fieldset)}>
            <Typography
              option={'regular_text14'}
              as={'label'}
              className={clsx(s.label)}
              htmlFor="name"
            >
              Name
            </Typography>
            <Input id="name" defaultValue="Pedro Duarte" className={clsx(s.fieldset)} />
          </div>
          <div className={clsx(s.fieldset)}>
            <Typography
              option={'regular_text14'}
              as={'label'}
              className={clsx(s.label)}
              htmlFor="username"
            >
              Username
            </Typography>
            <Input id="username" defaultValue="@peduarte" className={clsx(s.fieldset)} />
          </div>
          <DialogFooter className={clsx(s.footer)}>
            <DialogClose>
              <Button type="submit" className={clsx(s.button, 'green')}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
          <DialogClose>
            <Button type="submit" className={clsx(s.iconButton)} aria-label="Close">
              <Close />
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
}
*/
