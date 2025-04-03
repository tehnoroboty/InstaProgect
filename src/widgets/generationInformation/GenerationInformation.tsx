'use client'

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CustomerError } from '@/src/shared/model/api/types'
import {
  useDeleteProfileAvatarMutation,
  useGetMyProfileQuery,
  usePutUserProfileMutation,
} from '@/src/shared/model/api/usersApi'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { DatePicker } from '@/src/shared/ui/datePicker/DatePicker'
import { Dialog } from '@/src/shared/ui/dialog/Dialog'
import { Input } from '@/src/shared/ui/input'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Options, SelectBox } from '@/src/shared/ui/select/SelectBox'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { fetchCountriesAndCities } from '@/src/widgets/generationInformation/fetchCountriesAndCities'
import { FormType, schema } from '@/src/widgets/generationInformation/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './generationInformation.module.scss'

export const GenerationInformation = () => {
  const { data: MyProfile, isFetching } = useGetMyProfileQuery()
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [errorAge, setErrorAge] = useState<boolean>(false)
  const [deleteAvatar, { isLoading: isLoadingDelete }] = useDeleteProfileAvatarMutation()
  const [countrysWithCity, setCountrysWithCity] = useState<ResponseType>()
  const [countrys, setCountries] = useState<Options[]>([])
  const [cites, setCites] = useState<Options[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>()
  const [selectedCity, setSelectedCity] = useState<string>()
  const [updateProfile, { isLoading: isLoadingUpdate }] = usePutUserProfileMutation()

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    trigger,
  } = useForm<FormType>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    fetchCountriesAndCities(setCountrysWithCity, setCountries)
  }, [])

  useEffect(() => {
    if (selectedCountry && countrysWithCity) {
      const fetchCitiesForCountry = async () => {
        const res = countrysWithCity.data.find(item => item.country === selectedCountry)

        if (res) {
          const items = res.cities.map((city: any) => ({
            value: city,
            valueTitle: city,
          }))

          setCites(items)
        }
      }

      fetchCitiesForCountry()
    }
  }, [selectedCountry])

  useEffect(() => {
    reset({
      aboutMe: MyProfile?.aboutMe || '',
      city: MyProfile?.city || '',
      country: MyProfile?.country || '',
      dateOfBirth: MyProfile?.dateOfBirth || '',
      firstName: MyProfile?.firstName || '',
      lastName: MyProfile?.lastName || '',
      userName: MyProfile?.userName || '',
    })
  }, [MyProfile, isFetching, reset])

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

  const onSelectCountyHandler = (value: string) => {
    setSelectedCountry(value)
    setValue('country', value)
    if (!value) {
      setCites([])
    }
  }

  const onSelectCityHandler = (value: string) => {
    setSelectedCity(value)
    setValue('city', value)
    if (!value) {
      setCites([])
    }
  }
  const disabledButton = !isValid || Object.keys(errors).length > 0 || isLoadingUpdate

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      const registrationData = {
        aboutMe: formData.aboutMe,
        city: formData.city,
        country: formData.country,
        dateOfBirth: formData.dateOfBirth,
        firstName: formData.firstName,
        lastName: formData.lastName,
        region: '',
        userName: formData.userName,
      }

      await updateProfile(registrationData).unwrap()
    } catch (err) {
      const error = err as CustomerError
      const errorMessage = error.data?.messages[0]

      if (errorMessage?.field === 'userName') {
        setError('userName', {
          message: errorMessage.message,
          type: 'manual',
        })
        console.log(error)
      }
    }
  }

  if (isFetching) {
    return (
      <div className={s.pageLoading}>
        <Loader />
      </div>
    )
  }

  return (
    <>
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
            <Button type={'button'} variant={'bordered'}>
              {'Add a Profile Photo'}
            </Button>
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
                value={MyProfile?.dateOfBirth ? new Date(MyProfile.dateOfBirth) : undefined}
              />
              {errorAge && (
                <Typography as={'span'} className={s.error}>
                  {'A user under 13 cannot create a profile. Privacy Policy'}
                </Typography>
              )}
            </div>
            <div className={s.selectBox}>
              <SelectBox
                label={'Select your country'}
                onChangeValue={onSelectCountyHandler}
                options={countrys}
                placeholder={'Country'}
              />
              <SelectBox
                label={'Select your city'}
                onChangeValue={onSelectCityHandler}
                options={cites}
                placeholder={'City'}
              />
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
          <Button className={s.button} disabled={disabledButton} type={'submit'}>
            {'Save Changes'}
          </Button>
        </div>
      </form>
      <Dialog
        className={s.modalDeletePhoto}
        modalTitle={'Delete Photo'}
        onClose={() => setDeleteModal(false)}
        open={deleteModal}
      >
        <div className={s.modalDeletePhotoContent}>
          {'Do you really want to delete your profile photo?'}
          <div className={s.modalBtns}>
            <Button onClick={deleteAvatarHandler} type={'button'} variant={'bordered'}>
              {'Yes'}
            </Button>
            <Button onClick={() => setDeleteModal(false)} type={'button'} variant={'primary'}>
              {'No'}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

type ResponseType = {
  data: CountrysType[]
  error: boolean
  msg: string
}

type CountrysType = {
  cities: Array<string>
  country: string
  iso2: string
  iso3: string
}
