'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import clsx from 'clsx'

import 'react-day-picker/src/style.css'

import s from './calendar.module.scss'

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
        day_selected: s.daySelected,
        day_today: s.dayToday,
        dropdown_month: s.dropdownMonth,
        dropdown_year: s.dropdownYear,
        head_cell: s.headCell,
        head_row: s.headRow,
        month: s.month,
        row: s.row,
        table: s.table,
        ...classNames,
      }}
      fixedWeeks
      fromYear={1900}
      modifiers={{ weekend: { dayOfWeek: [0, 6] } }}
      modifiersClassNames={{ weekend: s.dayWeekend }}
      showOutsideDays={showOutsideDays}
      toDate={new Date()}
      weekStartsOn={1}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
