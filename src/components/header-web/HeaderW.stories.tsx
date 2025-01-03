// @flow
import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'

export type Props = {
  title?: string
  subtitle?: string
} & ComponentPropsWithoutRef<'header'>

export const HeaderW = (props: Props) => {
  return (
    <header {...props}>
      <span>{props.title}</span>
      <span>{props.subtitle}</span>
    </header>
  )
}
