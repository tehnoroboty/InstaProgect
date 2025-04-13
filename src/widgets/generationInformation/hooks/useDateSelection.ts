import { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { FormType } from '@/src/widgets/generationInformation/validators'

export const useDateSelection = (setValue: UseFormSetValue<FormType>) => {
  const [errorAge, setErrorAge] = useState<boolean>(false)
  const onSelectDate = (date: Date | undefined) => {
    if (date) {
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      const nowDate = new Date().getFullYear()
      const selectedDate = utcDate.getFullYear()
      const age = nowDate - selectedDate

      if (age < 13) {
        setErrorAge(true)
      } else {
        setErrorAge(false)
        setValue('dateOfBirth', utcDate.toISOString())
        sessionStorage.setItem('dateOfBirth', JSON.stringify(date))
      }
    } else {
      return
    }
  }

  return {
    errorAge,
    onSelectDate,
  }
}
