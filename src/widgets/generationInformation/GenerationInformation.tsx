'use client'

import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Input } from '@/src/shared/ui/input'
import { SelectBox } from '@/src/shared/ui/select/SelectBox'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'

import s from './generationInformation.module.scss'

export const GenerationInformation = () => {
  return (
    <form className={s.page}>
      <div className={s.photoBox}>
        <AvatarBox />
        <Button variant={'bordered'}>{'Add a Profile Photo'}</Button>
      </div>
      <div className={s.informationBox}>
        <Input important label={'userName'} />
        <Input important label={'First Name'} />
        <Input important label={'Last Name'} />
        <Input label={'Date of birth'} />
        <div className={s.selectBox}>
          <SelectBox
            label={'Select your country'}
            options={[]}
            placeholder={'Country'}
            size={'large'}
          />
          <SelectBox label={'Select your city'} options={[]} placeholder={'City'} size={'large'} />
        </div>
        <TextArea label={'About Me'} />
      </div>
      <div className={s.otherBox}>
        <hr className={s.hr} />
        <Button disabled>{'Save Changes'}</Button>
      </div>
    </form>
  )
}
