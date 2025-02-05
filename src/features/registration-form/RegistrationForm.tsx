'use client'

import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { CheckBox } from '@/src/components/checkbox/CheckBox'
import { Dialog } from '@/src/components/dialog'
import { Input } from '@/src/components/input'
import { OAuthButtons } from '@/src/components/oauthbuttons/OAuthButtons'
import { Typography } from '@/src/components/typography/Typography'
import { useRegistration } from '@/src/hooks/useRegistration'
import Link from 'next/link'

import s from '@/src/features/registration-form/registration.module.scss'

export const RegistrationForm = () => {
  const {
    disabledButton,
    errors,
    getValues,
    handleCloseMessage,
    handleSubmit,
    isLoading,
    onChangeHandler,
    onSubmit,
    ref,
    register,
    showSuccessMessage,
    trigger,
  } = useRegistration()

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

      <Card className={s.card}>
        <Typography as={'h1'} option={'h1'}>
          {'Sign Up'}
        </Typography>
        <OAuthButtons className={s.oauthBtns} />
        <form className={s.contentForm} onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={s.input}
            label={'Username'}
            placeholder={'Username'}
            type={'text'}
            {...register('username', {
              onBlur: () => trigger('username'),
            })}
            error={errors.username?.message}
          />
          <Input
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            {...register('email', {
              onBlur: () => trigger('email'),
            })}
            error={errors.email?.message}
          />
          <Input
            label={'Password'}
            placeholder={'сreate new password...'}
            type={'password'}
            {...register('password', {
              onBlur: () => trigger('password'),
            })}
            error={errors.password && errors.password.message}
          />
          <Input
            label={'Password confirmation'}
            placeholder={'confirm your password...'}
            type={'password'}
            {...register('passwordConfirmation', {
              onBlur: () => trigger('passwordConfirmation'),
            })}
            error={errors.passwordConfirmation && errors.passwordConfirmation.message}
          />
          <CheckBox
            label={
              <>
                {'I agree to the '}
                <Link className={s.link} href={'/auth/terms-of-service'}>
                  {' Terms  of  Service '}
                </Link>
                {' and '}
                <Link className={s.link} href={'/auth/privacy-policy'}>
                  {' Privacy Policy '}
                </Link>
              </>
            }
            labelProps={{ className: s.label }}
            onChange={onChangeHandler}
            ref={ref}
          />
          <Button disabled={disabledButton || isLoading} fullWidth variant={'primary'}>
            {'Sing Up'}
          </Button>
        </form>
        <div className={s.content}>
          <Typography as={'span'} className={s.text} option={'regular_text16'}>
            {'Do you have an account?'}
          </Typography>
          <Button as={Link} fullWidth href={'/auth/login'} variant={'transparent'}>
            {'Sing In'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
