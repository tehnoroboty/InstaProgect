// @flow
import * as React from 'react'
import { PropsWithChildren } from 'react'

import s from './scrollBar.module.scss'

export const ScrollBar = ({ children }: PropsWithChildren) => {
  return <div className={s.container}>{children}</div>
}
