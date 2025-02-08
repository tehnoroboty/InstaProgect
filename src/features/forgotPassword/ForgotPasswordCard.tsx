'use client'
import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { Dialog } from '@/src/components/dialog/Dialog'
import { Input } from '@/src/components/input/Input'
import { Recaptcha } from '@/src/components/recaptcha/Recaptcha'
import { Typography } from '@/src/components/typography/Typography'
import { useForgotPasswordCard } from '@/src/features/forgotPassword/hooks/useForgotPasswordCard'
import Link from 'next/link'

import s from './forgotPassword.module.scss'

export default function ForgotPasswordCard() {
  const {
    errors,
    formSubmit,
    getValues,
    handleResendLink,
    handleSubmit,
    isButtonDisabled,
    isModalOpen,
    onChangeEmail,
    onChangeToken,
    onSubmit,
    recaptchaError,
    recaptchaRef,
    register,
    serverError,
    setIsModalOpen,
    trigger,
  } = useForgotPasswordCard()

  return (
    <div className={s.container}>
      <Card className={s.card}>
        <Typography as={'h1'} option={'h1'}>
          {'Forgot Password'}
        </Typography>
        <form className={s.content} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            {...register('email', {
              onBlur: () => trigger('email'),
            })}
            error={(serverError && serverError) || (errors.email && errors.email.message)}
            onChange={onChangeEmail}
          />
          <Typography as={'span'} className={s.text}>
            {'Enter your email address and we will send you further instructions'}
          </Typography>
          {!formSubmit ? (
            <Button disabled={isButtonDisabled} fullWidth variant={'primary'}>
              {'Send Link'}
            </Button>
          ) : (
            <div className={s.alternativeContent}>
              <Typography as={'span'}>
                {'The link has been sent by email.If you don’t receive an email send link again'}
              </Typography>
              <Button fullWidth onClick={handleResendLink} variant={'primary'}>
                {'Send Link Again'}
              </Button>
            </div>
          )}
        </form>
        <Button as={Link} className={s.link} fullWidth href={'/login'} variant={'transparent'}>
          {'Back to Sing In'}
        </Button>
        {!formSubmit && (
          <Recaptcha
            className={s.recaptcha}
            isError={recaptchaError}
            onChangeValue={onChangeToken}
            ref={recaptchaRef}
          />
        )}
      </Card>
      <Dialog
        className={s.modal}
        modalTitle={'Email sent'}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      >
        <div className={s.contentModal}>
          <Typography
            as={'span'}
            option={'regular_text16'}
          >{`We have sent a link to confirm your email to ${getValues('email')}`}</Typography>
          <Button className={s.btnModal} onClick={() => setIsModalOpen(false)} variant={'primary'}>
            {'OK'}
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
