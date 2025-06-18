import React, { useEffect, useState } from 'react'

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/src/shared/assets/componentsIcons'
import { parseISOAndFormat } from '@/src/shared/hooks/parseIsoAndFormat'
import {
  SelectedSubscriptionType,
  SubscriptionType,
  SystemPaymentType,
} from '@/src/shared/lib/constants/subscriptions'
import {
  useCanceledAutoRenewalMutation,
  useCreateSubscriptionMutation,
  useCurrentPaymentsQuery,
  useMyPaymentsQuery,
} from '@/src/shared/model/api/subscriptionsApi'
import { ErrorDataType, ModalSuccessType } from '@/src/shared/model/api/types'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { Button } from '@/src/shared/ui/button/Button'
import { CheckBox } from '@/src/shared/ui/checkbox/CheckBox'
import { Dialog } from '@/src/shared/ui/dialog/Dialog'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { RadioBtn } from '@/src/shared/ui/radioGroup/RadioBtn'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import s from './accountManagement.module.scss'

export const AccountManagement = () => {
  const router = useRouter()
  const { data, isFetching } = useMyPaymentsQuery()
  const { data: currentSubscription } = useCurrentPaymentsQuery()
  const [paySubscription, { isError, isLoading: isLoadingPay }] = useCreateSubscriptionMutation()
  const [canceledAutoRenewal] = useCanceledAutoRenewalMutation()
  const params = useParams()
  const searchParams = useSearchParams()
  const [modalTitle, setModalTitle] = useState<string>('Create Payment')
  const [modalText, setModalText] = useState<string>(
    'Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings'
  )
  const [selectedType, setSelectedType] = useState<SubscriptionType>(SubscriptionType.Personal)
  const [selectedSubscription, setSelectedSubscription] = useState<SelectedSubscriptionType>(
    SelectedSubscriptionType.DAY
  )

  const [modalSuccessType, setModalSuccessType] = useState<ModalSuccessType | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('The inputModel has incorrect values')
  const [paymentSystem, setPaymentSystem] = useState<SystemPaymentType>(
    SystemPaymentType.CREDIT_CARD
  )
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalChecked, setModalChecked] = useState(false)
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.currentTarget.value as SubscriptionType)
  }

  const handleSelectedSubscriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubscription(event.currentTarget.value as SelectedSubscriptionType)
  }
  const onClickPayment = (sistemPayment: SystemPaymentType) => {
    setOpenModal(true)
    setPaymentSystem(sistemPayment)
  }

  useEffect(() => {
    if (searchParams.has('success')) {
      const isSearchParams = searchParams.get('success')

      if (isSearchParams === 'true') {
        setModalSuccessType({ type: 'success' })
        setModalTitle('Success')
        setModalText('Payment was successful!')
        setOpenModal(true)
      }
      if (isSearchParams === 'false') {
        setModalSuccessType({ type: 'error' })
        setModalTitle('Error')
        setModalText('Transaction failed. Please, write to support')
        setOpenModal(true)
      }
    } else {
      setModalSuccessType(null)
      setModalTitle('Create Payment')
      setModalText(
        'Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings'
      )
      setOpenModal(false)
    }
  }, [searchParams])

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedType(SubscriptionType.Bisiness)
    } else {
      setSelectedType(SubscriptionType.Personal)
    }
  }, [data])

  const buySubscription = async () => {
    try {
      const dataForPay = {
        amount: 0,
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL as string}/profile/${params.userId}/settings/account-management`,
        paymentType: paymentSystem,
        typeSubscription: selectedSubscription,
      }

      const res = await paySubscription(dataForPay).unwrap()

      if (res?.url) {
        window.location.assign(res.url)
      }
    } catch (err) {
      setErrorMessage((err as ErrorDataType).messages[0].message)
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
    <div className={s.page}>
      {isError && <Alerts message={errorMessage} type={'error'} />}
      {currentSubscription && currentSubscription.data.length > 0 && (
        <div className={s.container}>
          <Typography as={'h3'} option={'h3'}>
            {'Current Subscription:'}
          </Typography>
          <div
            className={clsx(s.box, s.dopBox)}
            key={currentSubscription.data[currentSubscription.data.length - 1].subscriptionId}
          >
            <div className={s.content}>
              <Typography as={'span'} className={clsx(s.contentTitle, s.contentText)}>
                {'Expire at'}
              </Typography>
              <Typography as={'span'} className={s.contentText}>
                {parseISOAndFormat(
                  currentSubscription.data[currentSubscription.data.length - 1].dateOfPayment
                )}
              </Typography>
            </div>
            <div className={s.content}>
              <Typography as={'span'} className={clsx(s.contentTitle, s.contentText)}>
                {'Next payment'}
              </Typography>
              <Typography as={'span'} className={s.contentText}>
                {parseISOAndFormat(
                  currentSubscription.data[currentSubscription.data.length - 1]
                    .endDateOfSubscription
                )}
              </Typography>
            </div>
          </div>
          <CheckBox
            checked={currentSubscription.hasAutoRenewal}
            label={'Auto-Renewal'}
            onChange={() => canceledAutoRenewal()}
          />
        </div>
      )}

      <div className={s.container}>
        <Typography as={'h3'} option={'h3'}>
          {'Account type:'}
        </Typography>
        <div className={s.box}>
          <div className={s.content}>
            <RadioBtn
              checked={selectedType === SubscriptionType.Personal}
              label={'Personal'}
              name={'accountType'}
              onChange={handleTypeChange}
              value={SubscriptionType.Personal}
            />
            <RadioBtn
              checked={selectedType === SubscriptionType.Bisiness}
              label={'Business'}
              name={'accountType'}
              onChange={handleTypeChange}
              value={SubscriptionType.Bisiness}
            />
          </div>
        </div>
      </div>
      {selectedType === SubscriptionType.Bisiness && (
        <div className={s.container}>
          <Typography as={'h3'} option={'h3'}>
            {'Change your subscription:'}
          </Typography>
          <div className={s.box}>
            <div className={s.content}>
              <RadioBtn
                checked={selectedSubscription === SelectedSubscriptionType.DAY}
                label={'$10 per 1 Day'}
                name={'subscription'}
                onChange={handleSelectedSubscriptionChange}
                value={SelectedSubscriptionType.DAY}
              />
              <RadioBtn
                checked={selectedSubscription === SelectedSubscriptionType.WEEKLY}
                label={'$50 per 7 Day'}
                name={'subscription'}
                onChange={handleSelectedSubscriptionChange}
                value={SelectedSubscriptionType.WEEKLY}
              />
              <RadioBtn
                checked={selectedSubscription === SelectedSubscriptionType.MONTHLY}
                label={'$100 per month'}
                name={'subscription'}
                onChange={handleSelectedSubscriptionChange}
                value={SelectedSubscriptionType.MONTHLY}
              />
            </div>
          </div>
          <div className={s.subscriptionPay}>
            <Button
              className={s.subscriptionPayBtn}
              onClick={() => onClickPayment(SystemPaymentType.PAYPAL)}
              variant={'bordered'}
            >
              <PaypalSvgrepoCom4 height={'100%'} viewBox={'-1 3 26 10'} width={'100%'} />
            </Button>
            <Typography as={'span'} option={'regular_text16'}>
              {'Or'}
            </Typography>
            <Button
              className={s.subscriptionPayBtn}
              onClick={() => {
                onClickPayment(SystemPaymentType.STRIPE)
              }}
              variant={'bordered'}
            >
              <StripeSvgrepoCom4 height={'100%'} viewBox={'0 3 24 10'} width={'100%'} />
            </Button>
          </div>
        </div>
      )}
      <Dialog
        className={s.modal}
        modalTitle={modalTitle}
        onClose={() => {
          setOpenModal(false)
          searchParams && router.push(`/profile/${params.userId}/settings/account-management`)
        }}
        open={openModal}
      >
        <div className={s.modalContent}>
          <Typography as={'p'} option={'regular_text16'}>
            {modalText}
          </Typography>
          <div className={s.modalAction}>
            {!modalSuccessType && (
              <CheckBox
                checked={modalChecked}
                label={'I agree'}
                labelProps={{ className: s.labelClass }}
                onChange={() => setModalChecked(!modalChecked)}
              />
            )}
            {modalSuccessType?.type === 'success' && (
              <Button
                className={s.btnModalResult}
                fullWidth
                onClick={() => {
                  setOpenModal(false)
                  router.push(`/profile/${params.userId}/settings/account-management`)
                }}
              >
                {'OK'}
              </Button>
            )}
            {modalSuccessType?.type === 'error' && (
              <Button
                className={s.btnModalResult}
                fullWidth
                onClick={() => {
                  setOpenModal(false)
                  router.push(`/profile/${params.userId}/settings/account-management`)
                }}
              >
                {'Back to payment'}
              </Button>
            )}
            {!modalSuccessType && (
              <Button disabled={!modalChecked || isLoadingPay} onClick={buySubscription}>
                {'OK'}
              </Button>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  )
}
