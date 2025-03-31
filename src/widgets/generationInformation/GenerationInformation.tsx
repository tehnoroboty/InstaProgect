'use client'

import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { DatePicker } from '@/src/shared/ui/datePicker/DatePicker'
import { Input } from '@/src/shared/ui/input'
import { SelectBox } from '@/src/shared/ui/select/SelectBox'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'

import s from './generationInformation.module.scss'

export const GenerationInformation = () => {
  return (
    <form className={s.page}>
      <div className={s.inputsContainer}>
        <div className={s.photoBox}>
          <AvatarBox />
          <Button variant={'bordered'}>{'Add a Profile Photo'}</Button>
        </div>
        <div className={s.informationBox}>
          <Input important label={'userName'} placeholder={''} />
          <Input important label={'First Name'} placeholder={''} />
          <Input important label={'Last Name'} placeholder={''} />
          <DatePicker label={'Date of birth'} />
          <div className={s.selectBox}>
            <SelectBox
              className={s.select}
              label={'Select your country'}
              options={[]}
              placeholder={'Country'}
              size={'large'}
            />
            <SelectBox
              className={s.select}
              label={'Select your city'}
              options={[]}
              placeholder={'City'}
              size={'large'}
            />
          </div>
          <TextArea label={'About Me'} labelClassName={s.labelClassName} />
        </div>
      </div>
      <div className={s.otherBox}>
        <hr className={s.hr} />
        <Button className={s.button} disabled>
          {'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
