import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './typography.module.scss'

const availableOptions = [
  'Large',
  'h1',
  'h2',
  'h3',
  'regular_text16',
  'bold_text16',
  'regular_text14',
  'medium_text14',
  'bold_text14',
  'small_text',
  'semi-bold_small_text',
  'regular_link',
  'small_link',
] as const

type OptionType = (typeof availableOptions)[number]

type Props<T extends ElementType = 'p'> = {
  as?: T
  children: ReactNode
  disable?: boolean
  disableClassName?: string
  lineHeights?: 'm' | 's' | 'xl'
  option?: OptionType
  size?: 'l' | 'm' | 's' | 'xl' | 'xs' | 'xxl'
  weight?: 'bold' | 'medium' | 'regular' | 'semi-bold'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(props: Props<T>) => {
  const {
    as: Component = 'p',
    className,
    disable,
    disableClassName,
    lineHeights,
    option = 'regular_text14',
    size,
    weight,
    ...rest
  } = props

  const styles = `${s[option]} ${weight ? s['font-weight-' + weight] : ''} ${size ? s['font-size-' + size] : ''} ${lineHeights ? s['line-heights' + lineHeights] : ''} ${disable ? s.labelDisable : ''} ${disableClassName || ''} ${className || ''}`

  return <Component className={styles} {...rest} />
}
