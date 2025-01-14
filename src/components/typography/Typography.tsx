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

type Props<T extends ElementType> = {
  /**
   * The HTML element to render (e.g., 'h1', 'h2', 'p'). @Default 'p'
   * */
  as?: T
  children: ReactNode
  disabled?: boolean
  disabledClassName?: string
  lineHeights?: 'm' | 's' | 'xl'
  option?: OptionType
  size?: 'l' | 'm' | 's' | 'xl' | 'xs' | 'xxl'
  weight?: 'bold' | 'medium' | 'regular' | 'semi-bold'
} & ComponentPropsWithoutRef<T>

/**
 * Typography component for rendering text with various styles.
 *
 * @template T - The type of the HTML element to render. Defaults to 'p'.
 *
 * @param {T} [props.as='p'] - The HTML element to render (e.g., 'h1', 'h2', 'p').
 *
 * @param {ReactNode} props.children - The content to be displayed inside the component.
 *
 * @param {boolean} [props.disabled=false] - If true, applies disabled styles.
 *
 * @param {string} [props.disabledClassName] - Additional class name to apply when disabled.
 *
 * @param {'s' | 'm' | 'xl'} [props.lineHeights] - The line height option.
 *
 * @param {OptionType} [props.option='regular_text14'] - The typography style option.
 *
 * @param {'l' | 'm' | 's' | 'xl' | 'xs' | 'xxl'} [props.size] - The size of the text.
 *
 * @param {'bold' | 'medium' | 'regular' | 'semi-bold'} [props.weight] - The font weight.
 *
 *
 * @returns {React.JSX.Element} The rendered Typography component.
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

  const styles = `${s[option]} ${weight ? s['font-weight-' + weight] : ''} ${size ? s['font-size-' + size] : ''} ${lineHeights ? s['line-heights' + lineHeights] : ''} ${disabled ? s.labelDisabled : ''} ${disabledClassName || ''} ${className || ''}`

  return <Component className={styles} {...rest} />
}
