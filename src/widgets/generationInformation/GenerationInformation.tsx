'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ResponseTypeCountys } from '@/src/entities/user/types'
import { AvatarContainerSettings } from '@/src/features/avatarContainerSettings/AvatarContainerSettings'
import { CustomerError } from '@/src/shared/model/api/types'
import {
  useDeleteProfileAvatarMutation,
  useGetMyProfileQuery,
  usePutUserProfileMutation,
} from '@/src/shared/model/api/usersApi'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { Button } from '@/src/shared/ui/button/Button'
import { DatePicker } from '@/src/shared/ui/datePicker/DatePicker'
import { Dialog } from '@/src/shared/ui/dialog/Dialog'
import { Input } from '@/src/shared/ui/input'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Options, SelectBox } from '@/src/shared/ui/select/SelectBox'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import { Typography } from '@/src/shared/ui/typography/Typography'
import {
  fetchCitiesForCountry,
  fetchCountriesAndCities,
} from '@/src/widgets/generationInformation/fetchCountriesAndCities'
import { FormType, schema } from '@/src/widgets/generationInformation/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './generationInformation.module.scss'

export const GenerationInformation = () => {
  const { data: MyProfile, isFetching } = useGetMyProfileQuery()
  const router = useRouter()
  const params = useSearchParams()
  const isFormDirty = params.get('isFormDirty')
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [errorAge, setErrorAge] = useState<boolean>(false)
  const [deleteAvatar, { isLoading: isLoadingDelete }] = useDeleteProfileAvatarMutation()
  const [countrysWithCity, setCountrysWithCity] = useState<ResponseTypeCountys>()
  const [countrys, setCountries] = useState<Options[]>([])
  const [cites, setCites] = useState<Options[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>(MyProfile?.country || '')
  const [selectedCity, setSelectedCity] = useState<string>(MyProfile?.city || '')
  const [updateProfile, { isLoading: isLoadingUpdate }] = usePutUserProfileMutation()
  const [alertMessage, setAlertMessage] = useState<null | string>(null)
  const [alertType, setAlertType] = useState<'error' | 'info' | 'success' | 'warning' | null>(null)

  const {
    formState: { errors, isDirty, isValid },
    getValues,
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
      fetchCitiesForCountry(countrysWithCity, selectedCountry, setCites)
    }
  }, [selectedCountry])

  useEffect(() => {
    // Базовые значения из MyProfile (если есть)
    const baseValues = {
      aboutMe: MyProfile?.aboutMe || '',
      city: MyProfile?.city || '',
      country: MyProfile?.country || '',
      dateOfBirth: MyProfile?.dateOfBirth || '',
      firstName: MyProfile?.firstName || '',
      lastName: MyProfile?.lastName || '',
      userName: MyProfile?.userName || '',
    }

    // Если форма "грязная" (были изменения), берем изменения из
    // sessionStorage
    if (isFormDirty === 'true') {
      const formUpdates: Partial<FormType> = {}

      // Поля формы, которые могут быть в sessionStorage
      const formFields: Array<keyof FormType> = [
        'userName',
        'firstName',
        'lastName',
        'dateOfBirth',
        'country',
        'city',
        'aboutMe',
      ]

      formFields.forEach(field => {
        const storedValue = sessionStorage.getItem(field)

        if (storedValue !== null) {
          // Особый случай для даты
          if (field === 'dateOfBirth') {
            try {
              const date = new Date(JSON.parse(storedValue))

              formUpdates[field] = date.toISOString()
            } catch {
              // Если не удалось распарсить, оставляем значение
              // из MyProfile
            }
          } else {
            formUpdates[field] = storedValue
          }
        }
      })

      // Сливаем базовые значения и изменения из storage
      reset({
        ...baseValues,
        ...formUpdates,
      })

      // Обновляем выбранные страну/город
      if (formUpdates.country !== undefined) {
        setSelectedCountry(formUpdates.country)
      }
      if (formUpdates.city !== undefined) {
        setSelectedCity(formUpdates.city)
      }
    } else {
      // Если форма чистая, просто используем данные из MyProfile
      reset(baseValues)
      setSelectedCountry(MyProfile?.country || '')
      setSelectedCity(MyProfile?.city || '')
    }
  }, [MyProfile, isFetching, reset])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target

    sessionStorage.setItem(name, value)
  }

  const deleteAvatarHandler = async () => {
    try {
      await deleteAvatar().unwrap()
    } catch (error) {
      setAlertMessage('Error! Server is not available!')
      setAlertType('error')
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
        sessionStorage.setItem('dateOfBirth', JSON.stringify(date))
      }
    } else {
      return
    }
  }

  const onSelectCountyHandler = (value: string) => {
    setSelectedCountry(value)
    setValue('country', value)
    sessionStorage.setItem('country', value)
    if (!value) {
      setCites([])
    }
  }
  const onSelectCityHandler = (value: string) => {
    setSelectedCity(value)
    setValue('city', value)
    sessionStorage.setItem('city', value)
    if (!value) {
      setCites([])
    }
  }

  useEffect(() => {
    if (isFetching) {
      sessionStorage.clear()

      return
    }
    if (isDirty) {
      router.push(`/profile/${MyProfile?.id}/settings?isFormDirty=true`)
    } else {
      router.push(`/profile/${MyProfile?.id}/settings`)
    }
  }, [isDirty, isFetching])

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
      sessionStorage.clear()
      setAlertMessage('Your settings are saved!')
      setAlertType('success')
    } catch (err) {
      const error = err as CustomerError
      const errorMessage = error.data?.messages[0]

      if (errorMessage?.field === 'userName') {
        setError('userName', {
          message: errorMessage.message,
          type: 'manual',
        })
        console.log(error)
        setAlertMessage('Error! Server is not available!')
        setAlertType('error')
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
      {alertMessage && alertType && <Alerts message={alertMessage} type={alertType} />}
      <form className={s.page} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputsContainer}>
          <AvatarContainerSettings
            deleteModal={() => setDeleteModal(true)}
            isLoadingDelete={isLoadingDelete}
            myProfileAvatars={MyProfile?.avatars}
            uploadAvatar={file => {
              // Здесь загрузка файла через RTK Query или fetch/post
              const formData = new FormData()

              formData.append('file', file)
              // dispatch(uploadAvatar(formData))
            }}
          />
          <div className={s.informationBox}>
            <Input
              important
              label={'userName'}
              placeholder={''}
              {...register('userName', {
                onBlur: () => {
                  trigger('userName'),
                    handleInputChange({
                      target: {
                        name: 'userName',
                        value: getValues('userName'),
                      },
                    })
                },
              })}
              error={errors.userName?.message}
            />
            <Input
              important
              label={'First Name'}
              placeholder={''}
              {...register('firstName', {
                onBlur: () => {
                  trigger('firstName'),
                    handleInputChange({
                      target: {
                        name: 'firstName',
                        value: getValues('firstName'),
                      },
                    })
                },
              })}
              error={errors.firstName?.message}
            />
            <Input
              important
              label={'Last Name'}
              placeholder={''}
              {...register('lastName', {
                onBlur: () => {
                  trigger('lastName'),
                    handleInputChange({
                      target: {
                        name: 'lastName',
                        value: getValues('lastName'),
                      },
                    })
                },
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
                  {'A user under 13 cannot create a profile'}
                  <Link className={s.link} href={'/privacy-policy'}>
                    {' Privacy Policy '}
                  </Link>
                </Typography>
              )}
            </div>
            <div className={s.selectBox}>
              <SelectBox
                label={'Select your country'}
                onChangeValue={onSelectCountyHandler}
                options={countrys}
                placeholder={'Country'}
                value={selectedCountry || MyProfile?.country || ''}
              />
              <SelectBox
                label={'Select your city'}
                onChangeValue={onSelectCityHandler}
                options={cites}
                placeholder={'City'}
                value={selectedCity || MyProfile?.city || ''}
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
