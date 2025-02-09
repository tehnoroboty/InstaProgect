'use client'
import { ComponentPropsWithoutRef } from 'react'

import PropagateLoader from 'react-spinners/PropagateLoader'

type LoaderProps = {
  color?: string
  size?: number
}

export const Loader = (props: LoaderProps) => {
  const { color = '#4C8DFF', size = 20 } = props

  return <PropagateLoader color={color} size={size} />
}
