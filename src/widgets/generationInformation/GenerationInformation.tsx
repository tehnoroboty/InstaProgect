'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  useDeleteProfileAvatarMutation,
  useGetMyProfileQuery,
} from '@/src/shared/model/api/usersApi'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { DatePicker } from '@/src/shared/ui/datePicker/DatePicker'
import { Dialog } from '@/src/shared/ui/dialog/Dialog'
import { Input } from '@/src/shared/ui/input'
import { Options, SelectBox } from '@/src/shared/ui/select/SelectBox'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { FormType, schema } from '@/src/widgets/generationInformation/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './generationInformation.module.scss'

export const GenerationInformation = () => {
  const { data: MyProfile, isFetching } = useGetMyProfileQuery()
  const [countrys, setCountries] = useState<Options[]>([])

  const {
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
  } = useForm<FormType>({
    defaultValues: {
      aboutMe: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://api.guap.ru/data/get-intcountries', {
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        const items = data.map((item: any) => ({
          value: item.ItemId,
          valueTitle: item.TitleEn,
        }))

        setCountries(items)
      } catch (err) {
        console.error('Error fetching countries:', err)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    reset({
      aboutMe: MyProfile?.aboutMe || '',
      dateOfBirth: MyProfile?.dateOfBirth || '',
      firstName: MyProfile?.firstName || '',
      lastName: MyProfile?.lastName || '',
      userName: MyProfile?.userName || '',
    })
  }, [MyProfile, isFetching, reset])

  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [errorAge, setErrorAge] = useState<boolean>(false)
  const [deleteAvatar, { isLoading: isLoadingDelete }] = useDeleteProfileAvatarMutation()

  const deleteAvatarHandler = async () => {
    try {
      await deleteAvatar().unwrap()
    } catch (error) {
      console.error(error)
    } finally {
      setDeleteModal(false)
    }
  }
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
      }
    } else {
      return
    }
  }

  const onSubmit: SubmitHandler<FormType> = async formData => {}

  return (
    <form className={s.page} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputsContainer}>
        <div className={s.photoBox}>
          <div className={s.avatarContainer}>
            <AvatarBox className={s.avatar} src={MyProfile?.avatars[0]?.url ?? ''} />
            {MyProfile?.avatars[0]?.url && (
              <button
                className={clsx(s.deleteBtn, { [s.disabledBtnDelete]: isLoadingDelete })}
                disabled={isLoadingDelete}
                onClick={() => setDeleteModal(true)}
                type={'button'}
              ></button>
            )}
          </div>
          <Button variant={'bordered'}>{'Add a Profile Photo'}</Button>
        </div>
        <div className={s.informationBox}>
          <Input
            important
            label={'userName'}
            placeholder={''}
            {...register('userName', {
              onBlur: () => trigger('userName'),
            })}
            error={errors.userName?.message}
          />
          <Input
            important
            label={'First Name'}
            placeholder={''}
            {...register('firstName', {
              onBlur: () => trigger('firstName'),
            })}
            error={errors.firstName?.message}
          />
          <Input
            important
            label={'Last Name'}
            placeholder={''}
            {...register('lastName', {
              onBlur: () => trigger('lastName'),
            })}
            error={errors.lastName?.message}
          />
          <div>
            <DatePicker
              error={errorAge}
              label={'Date of birth'}
              onSelect={date => onSelectDate(date)}
              value={MyProfile?.dateOfBirth}
            />
            {errorAge && (
              <Typography as={'span'} className={s.error}>
                {'A user under 13 cannot create a profile. Privacy Policy'}
              </Typography>
            )}
          </div>
          <div className={s.selectBox}>
            <SelectBox label={'Select your country'} options={countrys} placeholder={'Country'} />
            <SelectBox label={'Select your city'} options={[]} placeholder={'City'} />
          </div>
          <TextArea
            label={'About Me'}
            labelClassName={s.labelClassName}
            {...register('aboutMe', {
              onBlur: () => trigger('aboutMe'),
            })}
            error={errors.aboutMe?.message}
          />
        </div>
      </div>
      <div className={s.otherBox}>
        <hr className={s.hr} />
        <Button className={s.button}>{'Save Changes'}</Button>
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
            <Button onClick={deleteAvatarHandler} variant={'bordered'}>
              {'Yes'}
            </Button>
            <Button onClick={() => setDeleteModal(false)} variant={'primary'}>
              {'No'}
            </Button>
          </div>
        </div>
      </Dialog>
    </form>
  )
}
