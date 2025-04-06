'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import ArrowIosForwardOutline from '@/src/shared/assets/componentsIcons/ArrowIosForwardOutline'
import clsx from 'clsx'

import 'react-day-picker/src/style.css'

import s from './calendar.module.scss'

import { Button } from '../button/Button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      captionLayout={'dropdown'}
      className={clsx(s.calendarContainer, className)}
      classNames={{
        caption: s.caption,
        caption_label: s.captionLabel,
        cell: s.cell,
        day: s.day,
        day_disabled: s.dayDisabled,
        day_hidden: s.dayHidden,
        day_outside: s.dayOutside,
        day_range_end: 'day-range-end',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_range_start: 'day-range-start',
        day_selected: s.daySelected,
        day_today: s.dayToday,
        head_cell: s.headCell,
        head_row: s.headRow,
        month: s.month,
        months: s.months,
        nav: s.nav,
        nav_button: clsx(Button({ variant: 'transparent' }), s.navButton),
        nav_button_next: s.navButtonNext,
        nav_button_previous: s.navButtonPrev,
        row: s.row,
        table: s.table,
        ...classNames,
      }}
      // }}
      fromYear={1900}
      // components={{
      //   IconLeft: ({ className, ...props }) => (
      //     <ArrowIosBackOutline className={clsx('h-4 w-4', className)} {...props} />
      //   ),
      //   IconRight: ({ className, ...props }) => (
      //     <ArrowIosForwardOutline className={clsx('h-4 w-4', className)} {...props} />
      //   ),
      modifiers={{ weekend: { dayOfWeek: [0, 6] } }}
      modifiersClassNames={{ weekend: s.dayWeekend }}
      // pagedNavigation
      showOutsideDays={showOutsideDays}
      toDate={new Date()}
      weekStartsOn={1}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
