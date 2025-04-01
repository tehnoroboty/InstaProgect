'use client'

import { useState } from 'react'

import CalendarOutline from '@/src/shared/assets/componentsIcons/CalendarOutline'
import { Calendar } from '@/src/shared/ui/calendar/Calendar'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import clsx from 'clsx'
import { format, parseISO } from 'date-fns'

import s from './datePicker.module.scss'

type Props = {
  error?: boolean
  label?: string
  onSelect?: (value?: Date) => void
  value?: string
}

export const DatePicker = ({ error, label, onSelect, value }: Props) => {
  const [date, setDate] = useState<Date | undefined>()

  const onSelectHandler = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (onSelect) {
      onSelect(selectedDate)
    }
  }

  return (
    <div className={s.datePickerContainer}>
      {label && (
        <Typography as={'label'} className={s.label}>
          {label}
        </Typography>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <button className={clsx(s.datePickerBtn, { [s.errorBtn]: error })} type={'button'}>
            <Typography as={'span'} className={error ? s.error : ''} option={'regular_text16'}>
              {date ? format(date, 'dd.MM.yyyy') : '00.00.0000'}
            </Typography>
            <CalendarOutline className={error ? s.error : ''} />
          </button>
        </PopoverTrigger>
        <PopoverContent align={'start'} className={s.content} side={'bottom'}>
          <Calendar mode={'single'} onSelect={onSelectHandler} selected={date} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
