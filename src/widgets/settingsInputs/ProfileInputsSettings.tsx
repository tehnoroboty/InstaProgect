import React from 'react'
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormTrigger } from 'react-hook-form'

import { Input } from '@/src/shared/ui/input'
import { FormType } from '@/src/widgets/generationInformation/validators'

export type Props = {
  errors: FieldErrors<FormType>
  getValues: UseFormGetValues<FormType>
  handleInputChange: (e: { target: { name: keyof FormType; value: string } }) => void
  register: UseFormRegister<FormType>
  trigger: UseFormTrigger<FormType>
}

export const ProfileInputsSettings = ({
  errors,
  getValues,
  handleInputChange,
  register,
  trigger,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    sessionStorage.setItem(e.target.name, e.target.value)
  }

  return (
    <>
      <Input
        important
        label={'userName'}
        placeholder={''}
        {...register('userName', {
          onBlur: async () => {
            await trigger('userName')
            handleInputChange({
              target: {
                name: 'userName',
                value: getValues('userName'),
              },
            })
          },
          onChange: handleChange,
        })}
        error={errors.userName?.message}
      />
      <Input
        important
        label={'First Name'}
        placeholder={''}
        {...register('firstName', {
          onBlur: async () => {
            await trigger('firstName')
            handleInputChange({
              target: {
                name: 'firstName',
                value: getValues('firstName'),
              },
            })
          },
          onChange: handleChange,
        })}
        error={errors.firstName?.message}
      />
      <Input
        important
        label={'Last Name'}
        placeholder={''}
        {...register('lastName', {
          onBlur: async () => {
            await trigger('lastName')
            handleInputChange({
              target: {
                name: 'lastName',
                value: getValues('lastName'),
              },
            })
          },
          onChange: handleChange,
        })}
        error={errors.lastName?.message}
      />
    </>
  )
}
