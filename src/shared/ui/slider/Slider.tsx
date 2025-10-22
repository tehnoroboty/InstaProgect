import { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type PropsSlider = {
  setVolume: (value: number) => void
  zoom: number
}

export const SliderComponent = ({ setVolume, zoom }: PropsSlider) => {
  const [value, setValue] = useState([zoom])

  const handleSliderChange = (newValue: number[]) => {
    const value = Number(newValue)

    setValue(newValue)
    setVolume(value)
  }

  return (
    <Slider.Root
      className={s.root}
      defaultValue={[1]}
      max={2}
      min={0.8}
      onValueChange={handleSliderChange}
      step={0.1}
      value={value}
    >
      <Slider.Track className={s.track}>
        <Slider.Range className={s.range} />
      </Slider.Track>
      <Slider.Thumb aria-label={'Volume'} className={s.thumb} />
    </Slider.Root>
  )
}
