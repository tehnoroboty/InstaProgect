// @flow
'use client'
import * as React from 'react'

import { ItemWrapper } from '@/src/widgets/itemWrapper/ItemWrapper'
import {MenuItemType} from "@/src/widgets/navigationPanel/types";

type Props = {
  className?: string
  items: MenuItemType[]
}
export const MenuSection = ({ className, items }: Props) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <ItemWrapper
          Icon={item.icon}
          IconActive={item.iconActive}
          href={item.href}
          key={index}
          onClick={item.onClick}
          title={item.title}
        />
      ))}
    </div>
  )
}
