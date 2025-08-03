import { ChangeEvent, ComponentProps, ReactNode, useEffect, useMemo } from 'react'

import { Dialog } from '@/src/shared/ui/dialog'
import { Input } from '@/src/shared/ui/input'
import debounce from 'lodash/debounce'

import s from './socialModal.module.scss'

type Props = {
  children: ReactNode
  onSearchChange?: (value: string) => void
  title: string
} & ComponentProps<typeof Dialog>

export const SocialModal = ({ children, onSearchChange, title, ...props }: Props) => {
  const debouncedOnChange = useMemo(() => {
    return debounce((value: string) => {
      onSearchChange?.(value)
    }, 300)
  }, [onSearchChange])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(e.target.value)
  }

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel()
    }
  }, [debouncedOnChange])

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
