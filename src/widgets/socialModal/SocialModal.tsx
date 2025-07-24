import { ChangeEvent, ComponentProps, ReactNode } from 'react'

import { Dialog } from '@/src/shared/ui/dialog'
import { Input } from '@/src/shared/ui/input'

import s from './socialModal.module.scss'

type Props = {
  children: ReactNode
  onSearchChange?: (value: string) => void
  title: string
} & ComponentProps<typeof Dialog>

export const SocialModal = ({ children, onSearchChange, title, ...props }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value)
  }

  return (
    <Dialog modalTitle={title} {...props} className={s.socialModal}>
      <div className={s.inputWrapper}>
        <Input
          aria-label={'Search users'}
          className={s.input}
          onChange={handleChange}
          placeholder={'Search'}
          type={'search'}
        />
      </div>

      <div className={s.content}>{children}</div>
    </Dialog>
  )
}
