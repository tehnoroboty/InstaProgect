import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import s from './typography.module.scss'

export const availableOptions = ['Large', 'h1', 'h2', 'h3', 'text', 'link'] as const

export type OptionType = (typeof availableOptions)[number]

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  children: ReactNode | string
  option: OptionType
  size?: 'small' | 'medium' | 'large'
  weight?: 'regular' | 'medium' | 'bold' | 'semi-bold'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(props: TypographyProps<T>) => {
  const { as: Component = 'p', weight, size, option, ...rest } = props

  return (
    <Component
      className={`${s.typography} ${s[option]} ${weight ? s[weight] : ''} ${size ? s[size] : ''}`}
      {...rest}
    />
  )
}
