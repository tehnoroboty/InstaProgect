import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

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

type Props<T extends ElementType> = {
  /** as - The HTML element to render (e.g., 'h1', 'h2', 'p').*/
  as?: T
  /** Children - The content to be displayed inside the component.*/
  children: ReactNode
  /** disabled - If true, applies disabled styles.*/
  disabled?: boolean
  /** disabledClassName - Additional class name to apply when disabled.*/
  disabledClassName?: string
  /** lineHeights - The line height option.*/
  lineHeights?: 'm' | 's' | 'xl'
  /** option - The typography style option.*/
  option?: OptionType
  /** size - The size of the text.*/
  size?: 'l' | 'm' | 's' | 'xl' | 'xs' | 'xxl'
  /** weight - The font weight.*/
  weight?: 'bold' | 'medium' | 'regular' | 'semi-bold'
} & ComponentPropsWithoutRef<T>

/**
 * Typography component for rendering text with various styles.
 */
export const Typography = <T extends ElementType = 'p'>(props: Props<T>) => {
  const {
    as: Component = 'p',
    className,
    disabled = false,
    disabledClassName,
    lineHeights,
    option = 'regular_text14',
    size,
    weight,
    ...rest
  } = props

  const styles = clsx(
    s[option],
    weight && s[`font-weight-${weight}`],
    size && s[`font-size-${size}`],
    lineHeights && s[`line-heights-${lineHeights}`],
    disabled && s.labelDisabled,
    disabledClassName,
    className
  )

  return <Component className={styles} {...rest} />
}
