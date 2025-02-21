'use client'

import { Content } from '@radix-ui/react-dialog'

import s from './createPost.module.scss'

import { Button } from '../button/Button'
import { Dialog } from '../dialog/Dialog'

export const CreatePost = () => {
  return (
    <div>
      <Dialog className={s.modal} modalTitle={'Add Photo'} onClose={() => {}} open>
        <Content>
          <div className={s.buttons}>
            <Button variant={'primary'}>{'Select from Computer'}</Button>
            <Button variant={'bordered'}>{'Open Draft'}</Button>
          </div>
        </Content>
      </Dialog>
    </div>
  )
}
