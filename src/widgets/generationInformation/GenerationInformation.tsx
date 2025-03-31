'use client'

import { useState } from 'react'

import { useGetMyProfileQuery } from '@/src/shared/model/api/usersApi'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { DatePicker } from '@/src/shared/ui/datePicker/DatePicker'
import { Dialog } from '@/src/shared/ui/dialog/Dialog'
import { Input } from '@/src/shared/ui/input'
import { SelectBox } from '@/src/shared/ui/select/SelectBox'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'

import s from './generationInformation.module.scss'

export const GenerationInformation = () => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const { data: MyProfile } = useGetMyProfileQuery()

  return (
    <form className={s.page}>
      <div className={s.inputsContainer}>
        <div className={s.photoBox}>
          <div className={s.avatarContainer}>
            <AvatarBox className={s.avatar} src={MyProfile?.avatars[0].url} />
            {MyProfile?.avatars && (
              <button
                className={s.closeBtn}
                onClick={() => setDeleteModal(true)}
                type={'button'}
              ></button>
            )}
          </div>
          <Button variant={'bordered'}>{'Add a Profile Photo'}</Button>
        </div>
        <div className={s.informationBox}>
          <Input important label={'userName'} placeholder={''} value={MyProfile?.userName ?? ''} />
          <Input
            important
            label={'First Name'}
            placeholder={''}
            value={MyProfile?.firstName ?? ''}
          />
          <Input important label={'Last Name'} placeholder={''} value={MyProfile?.lastName ?? ''} />
          <DatePicker label={'Date of birth'} value={MyProfile?.dateOfBirth ?? ''} />
          <div className={s.selectBox}>
            <SelectBox label={'Select your country'} options={[]} placeholder={'Country'} />
            <SelectBox label={'Select your city'} options={[]} placeholder={'City'} />
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
      <Dialog
        className={s.modalDeletePhoto}
        modalTitle={'Delete Photo'}
        onClose={() => setDeleteModal(false)}
        open={deleteModal}
      >
        <div className={s.modalDeletePhotoContent}>
          {'Do you really want to delete your profile photo?'}
          <div className={s.modalBtns}>
            <Button variant={'bordered'}>{'Yes'}</Button>
            <Button onClick={() => setDeleteModal(false)} variant={'primary'}>
              {'No'}
            </Button>
          </div>
        </div>
      </Dialog>
    </form>
  )
}
