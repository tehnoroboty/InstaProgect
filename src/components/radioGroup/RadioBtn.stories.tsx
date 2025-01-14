// RadioBtn.stories.tsx
import React, { useState } from 'react'
import { RadioBtn } from './RadioBtn'

export default {
    title: 'Components/RadioBtn',
    component: RadioBtn,
}

export const Default = () => {
    const [selectedValue, setSelectedValue] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(e.target.value)
    }

    return (
        <div>
            <RadioBtn
                label="Option 1"
    name="group1"
    value="option1"
    checked={selectedValue === 'option1'}
    onChange={handleChange}
    />
    <RadioBtn
    label="Option 2"
    name="group1"
    value="option2"
    checked={selectedValue === 'option2'}
    onChange={handleChange}
    />
    <RadioBtn
    label="Option 3"
    name="group1"
    value="option3"
    checked={selectedValue === 'option3'}
    onChange={handleChange}
    />
    <div>
    <strong>Selected Value:</strong> {selectedValue}
    </div>
    </div>
)
}
