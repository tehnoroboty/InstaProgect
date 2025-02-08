'use client'
import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { Dialog } from '@/src/components/dialog/Dialog'
import { Input } from '@/src/components/input/Input'
import { Typography } from '@/src/components/typography/Typography'

import s from './createNewPasswordPage.module.scss'

import { useCreateNewPassword } from './hooks/useCreateNewPassword'

export default function CreateNewPasswordCard() {
  const {
    err,
    errors,
    handleSubmit,
    isError,
    isLoading,
    isModalOpen,
    isSuccess,
    onChangeNewPassword,
    onCloseModalHandler,
    onSubmit,
    register,
    trigger,
  } = useCreateNewPassword()

  return (
    <div className={s.container}>
      <Card className={s.card}>
        <Typography as={'h1'} option={'h1'}>
          {'Forgot Password'}
        </Typography>
        <form className={s.content} noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputs}>
            <Input
              label={'New password'}
              placeholder={'сreate new password...'}
              type={'password'}
              {...register('newPassword', {
                onBlur: () => trigger('newPassword'),
              })}
              error={errors.newPassword && errors.newPassword.message}
              onChange={onChangeNewPassword}
            />
            <Input
              label={'Password confirmation'}
              placeholder={'confirm your password...'}
              type={'password'}
              {...register('passwordConfirmation')}
              error={errors.passwordConfirmation && errors.passwordConfirmation.message}
            />
          </div>
          <Typography as={'span'} className={s.text}>
            {'Your password must be between 6 and 20 characters'}
          </Typography>
          <Button disabled={isLoading} fullWidth variant={'primary'}>
            {'Create new password'}
          </Button>
        </form>
      </Card>
      {isError ||
        (isSuccess && (
          <Dialog
            className={s.modal}
            modalTitle={isError ? `Error ${err.status}` : 'Password Successfully Changed'}
            onClose={onCloseModalHandler}
            open={isModalOpen}
          >
            <div className={s.contentModal}>
              <Typography as={'span'} option={'regular_text16'}>
                {isError
                  ? err.data.messages[0].message
                  : 'Your password has been successfully updated. You can now log in with your new password.'}
              </Typography>
              <Button className={s.btnModal} onClick={onCloseModalHandler} variant={'primary'}>
                {'OK'}
              </Button>
            </div>
          </Dialog>
        ))}
    </div>
  )
}
