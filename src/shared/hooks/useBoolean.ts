import { useState } from 'react'

type UseBooleanReturn = {
  setFalse: () => void
  setTrue: () => void
  toggle: () => void
  value: boolean
}

export const useBoolean = (initialValue = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialValue)

  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  const toggle = () => setValue(prev => !prev)

  return { setFalse, setTrue, toggle, value }
}
