import {ComponentPropsWithoutRef} from 'react'

import * as Select from '@radix-ui/react-select'

import styles from './Select.module.scss'

import {SelectItem} from './SelectItem'
import Arrow from '@/src/assets/componentsIcons/ArrowIosDownOutline'

export type Options = {
    value: string
    valueTitle: string
}

type Props = {
    label?: string
    placeholder: string
    options: Options[]
    size?: 'small' | 'medium' | 'large'
} & ComponentPropsWithoutRef<'button'>

export const SelectBox = ({label, placeholder = 'Select', options, size, ...rest}: Props) => {

    return (
        <Select.Root>
            <Select.Group>
                {label && <Select.Label className={styles.label}>{label}</Select.Label>}
                <Select.Trigger
                    className={`${styles.trigger} ${size ? styles[size] : ''} ${label && styles.triggerLabel}`}
                    {...rest}
                    aria-label={placeholder}
                >
                    <Select.Value placeholder={placeholder}/>
                    <Select.Icon asChild>
                        <Arrow className={styles.icon}/>
                    </Select.Icon>
                </Select.Trigger>
            </Select.Group>

            <Select.Portal>
                <Select.Content
                    avoidCollisions
                    className={styles.content}
                    position={'popper'}
                    sideOffset={-1}
                >
                    <Select.Viewport>
                        <Select.Group>
                            {options.map(item => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.valueTitle}
                                </SelectItem>
                            ))}
                        </Select.Group>
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}
