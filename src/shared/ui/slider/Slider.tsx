import * as React from 'react'
import { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export const SliderComponent = () => {
  const [value, setValue] = useState([0])

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue)
  }

  return (
    <Slider.Root
      className={s.root}
      defaultValue={[0]}
      max={10}
      onValueChange={handleSliderChange}
      step={1}
      value={value}
    >
      <Slider.Track className={s.track}>
        <Slider.Range className={s.range} />
      </Slider.Track>
      <Slider.Thumb aria-label={'Volume'} className={s.thumb} />
    </Slider.Root>
  )
}
