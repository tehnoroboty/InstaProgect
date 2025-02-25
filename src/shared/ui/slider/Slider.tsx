import * as React from 'react'
import { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

type Props = {
  setVolume: (value: number) => void
}

export const SliderComponent = ({ setVolume }: Props) => {
  const [value, setValue] = useState([1])

  const handleSliderChange = (newValue: number[]) => {
    const value = Number(newValue)

    setValue(newValue)
    setVolume(value)
  }

  return (
    <Slider.Root
      className={s.root}
      defaultValue={[1]}
      max={10}
      min={1}
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
