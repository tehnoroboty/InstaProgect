'use client'

import { useState } from 'react'

import CalendarOutline from '@/src/shared/assets/componentsIcons/CalendarOutline'
import { Calendar } from '@/src/shared/ui/calendar/Calendar'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { format } from 'date-fns'

import s from './datePicker.module.scss'

import { Button } from '../button/Button'

type Props = {
  label?: string
}

export const DatePicker = ({ label }: Props) => {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className={s.datePickerContainer}>
      {label && (
        <Typography as={'label'} className={s.label}>
          {label}
        </Typography>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <button className={s.datePickerBtn} type={'button'}>
            <Typography as={'span'} option={'regular_text16'}>
              {date ? format(date, 'PPP') : '00.00.0000'}
            </Typography>
            <CalendarOutline />
          </button>
        </PopoverTrigger>
        <PopoverContent align={'start'} className={s.content} side={'bottom'}>
          <Calendar mode={'single'} onSelect={setDate} selected={date} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
