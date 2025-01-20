import { ComponentPropsWithoutRef, ReactNode } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type Props = {
  children: ReactNode | string
  className?: string
} & ComponentPropsWithoutRef<'div'>

export const Card = (props: Props) => {
  const classNames = clsx(s.card, props.className && props.className)

  return <div className={classNames}>{props.children}</div>
}
