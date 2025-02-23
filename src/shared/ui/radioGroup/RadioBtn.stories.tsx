import React, { useState } from 'react'

import { RadioBtn } from './RadioBtn'

export default {
  component: RadioBtn,
  tags: ['autodocs'],
  title: 'Components/RadioBtn',
}

export const Default = () => {
  const [selectedValue, setSelectedValue] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value)
  }

  return (
    <div>
      <RadioBtn
        checked={selectedValue === 'option1'}
        disabled
        label={'Option 1'}
        name={'group1'}
        onChange={handleChange}
        value={'option1'}
      />
      <RadioBtn
        checked={selectedValue === 'option2'}
        label={'Option 2'}
        name={'group1'}
        onChange={handleChange}
        value={'option2'}
      />
      <RadioBtn
        checked={selectedValue === 'option3'}
        label={'Option 3'}
        name={'group1'}
        onChange={handleChange}
        value={'option3'}
      />
      <div>
        <span>Selected Value: {selectedValue}</span>
      </div>
    </div>
  )
}
