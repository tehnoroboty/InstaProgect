'use client'
import { Button } from '@/src/components/button/Button'
import { Dialog } from '@/src/components/dialog'
import { Input } from '@/src/components/input/Input'
import { Typography } from '@/src/components/typography/Typography'
import { useLinkExpiredForm } from '@/src/features/link-expired-form/hooks/useLinkExpiredForm'
import Image from 'next/image'

import s from './link-expired.module.scss'

export const LinkExpiredForm = () => {
  const {
    errors,
    getValues,
    handleCloseMessage,
    handleSubmit,
    isLoading,
    onChangeHandler,
    onSubmit,
    register,
    showSuccessMessage,
    trigger,
    watch,
  } = useLinkExpiredForm()

  return (
    <div className={s.container}>
      <Dialog
        className={s.modalEmailSent}
        modalTitle={'Email sent'}
        onClose={handleCloseMessage}
        open={showSuccessMessage}
      >
        <div className={s.modalContent}>
          <Typography as={'p'} className={s.modalText} option={'regular_text16'}>
            {`We have sent a link to confirm your email to ${getValues('email')}`}
          </Typography>
          <Button className={s.modalButton} onClick={handleCloseMessage} variant={'primary'}>
            {'OK'}
          </Button>
        </div>
      </Dialog>

      <Typography as={'h1'} option={'h1'}>
        {'Email verification link expired'}
      </Typography>
      <Typography as={'span'} option={'regular_text14'}>
        {'Looks like the verification link has expired. Not to worry, we can send the link again'}
      </Typography>
      <form className={s.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={s.input}
          label={'Email'}
          placeholder={'email@example.com'}
          {...register('email', { onBlur: () => trigger('email'), onChange: onChangeHandler })}
          error={errors.email && errors.email.message}
        />
        <Button disabled={!watch('email') || isLoading} variant={'primary'}>
          {'Resend verification link'}
        </Button>
      </form>
      <Image alt={''} height={320} src={'/image/rafiki.svg'} width={430} />
    </div>
  )
}
