// @flow
import * as React from 'react'

import s from './scrollBar.module.scss'

type Props = {
  children: React.ReactNode
}
export const ScrollBar: React.FC<Props> = ({ children }) => {
  return <div className={s.container}>{children}</div>
}
