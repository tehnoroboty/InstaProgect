// @flow
'use client'
import * as React from 'react'

import { ItemWrapper } from '@/src/components/itemWrapper/ItemWrapper'
import { MenuItemType } from '@/src/components/sidebar/Sidebar'

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
                    title={item.title}
                />
            ))}
        </div>
    )
}
