'use client'

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AvatarContainerSettings } from '@/src/features/avatarContainerSettings/AvatarContainerSettings'
import { CustomerError, InputChangeEvent } from '@/src/shared/model/api/types'
import { useGetMyProfileQuery, usePutUserProfileMutation } from '@/src/shared/model/api/usersApi'
import { Button } from '@/src/shared/ui/button/Button'
import { DatePicker } from '@/src/shared/ui/datePicker/DatePicker'
import { SelectBox } from '@/src/shared/ui/select/SelectBox'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { useCountryCityData } from '@/src/widgets/generationInformation/hooks/useCountryCityData'
import { useDateSelection } from '@/src/widgets/generationInformation/hooks/useDateSelection'
import { FormType, schema } from '@/src/widgets/generationInformation/validators'
import { ProfileInputsSettings } from '@/src/widgets/settingsInputs/ProfileInputsSettings'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './generationInformation.module.scss'

export const GenerationInformation = () => {
  const { data: MyProfile, isFetching } = useGetMyProfileQuery()
  const [updateProfile, { isLoading: isLoadingUpdate }] = usePutUserProfileMutation()
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
  const router = useRouter()
  const params = useSearchParams()
  const isFormDirty = params.get('isFormDirty')

  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const { cites, countries, countriesWithCity, setCites } = useCountryCityData(selectedCountry)
  const { errorAge, onSelectDate } = useDateSelection(setValue)

  useEffect(() => {
    const baseValues = {
      aboutMe: MyProfile?.aboutMe || '',
      city: MyProfile?.city || '',
      country: MyProfile?.country || '',
      dateOfBirth: MyProfile?.dateOfBirth || '',
      firstName: MyProfile?.firstName || '',
      lastName: MyProfile?.lastName || '',
      userName: MyProfile?.userName || '',
    }

    if (isFormDirty === 'true') {
      const formUpdates: Partial<FormType> = {}
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
          if (field === 'dateOfBirth') {
            try {
              const date = new Date(JSON.parse(storedValue))

              formUpdates[field] = date.toISOString()
            } catch {
              // Если не удалось распарсить, оставляем значение из MyProfile
            }
          } else {
            formUpdates[field] = storedValue
          }
        }
      })

      reset({ ...baseValues, ...formUpdates })

      if (formUpdates.country !== undefined) {
        setSelectedCountry(formUpdates.country)
      }
      if (formUpdates.city !== undefined) {
        setSelectedCity(formUpdates.city)
      }
    } else {
      reset(baseValues)
      setSelectedCountry(MyProfile?.country || '')
      setSelectedCity(MyProfile?.city || '')
    }
  }, [MyProfile, isFetching, isFormDirty, reset])

  useEffect(() => {
    if (MyProfile && !isFormDirty) {
      setSelectedCountry(prev => (prev ? prev : MyProfile.country || ''))
      setSelectedCity(prev => (prev ? prev : MyProfile.city || ''))
    }
  }, [MyProfile, isFormDirty])

  const handleInputChange = (e: InputChangeEvent) => {
    sessionStorage.setItem(e.target.name, e.target.value)
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
      router.push(`/profile/${MyProfile?.id}/settings/general-information?isFormDirty=true`)
    } else {
      router.push(`/profile/${MyProfile?.id}/settings/general-information`)
    }
  }, [MyProfile?.id, isDirty, isFetching, router])

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
    } catch (err) {
      const error = err as CustomerError
      const errorMessage = error.data?.messages[0]

      if (errorMessage?.field === 'userName') {
        setError('userName', {
          message: errorMessage.message,
          type: 'manual',
        })
      }
    }
  }

  /*
  if (isFetching || !countriesWithCity) {
    return (
      <div className={s.pageLoading}>
        <Loader />
      </div>
    )
  }
*/

  return (
    <>
      <form className={s.page} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputsContainer}>
          <AvatarContainerSettings myProfileAvatars={MyProfile?.avatars} />
          <div className={s.informationBox}>
            <ProfileInputsSettings
              errors={errors}
              getValues={getValues}
              handleInputChange={handleInputChange}
              register={register}
              trigger={trigger}
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
              {/*
              <SelectBox
                label={'Select your country'}
                onChangeValue={onSelectCountyHandler}
                options={countries}
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
*/}
              {isFetching || !countriesWithCity ? (
                <div className={s.selectLoader}>
                  <div className={s.loader}>
                    <Typography option={'bold_text14'}>Loading...</Typography>
                  </div>
                </div>
              ) : (
                <>
                  <SelectBox
                    label={'Select your country'}
                    onChangeValue={onSelectCountyHandler}
                    options={countries}
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
                </>
              )}
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
          <Button
            className={s.button}
            disabled={!isValid || Object.keys(errors).length > 0 || isLoadingUpdate}
            type={'submit'}
          >
            {' '}
            {'Save Changes'}
          </Button>
        </div>
      </form>
    </>
  )
}
