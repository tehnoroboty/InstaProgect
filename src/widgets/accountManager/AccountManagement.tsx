import React, { useState } from 'react'

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/src/shared/assets/componentsIcons'
import {
  SelectedSubscriptionType,
  SubscriptionType,
} from '@/src/shared/lib/constants/subscriptions'
import { Button } from '@/src/shared/ui/button/Button'
import { CheckBox } from '@/src/shared/ui/checkbox/CheckBox'
import { RadioBtn } from '@/src/shared/ui/radioGroup/RadioBtn'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from './accountManagement.module.scss'

export const AccountManagement = () => {
  const [selectedType, setSelectedType] = useState<SubscriptionType>(SubscriptionType.Personal)
  const [selectedSubscription, setSelectedSubscription] = useState<SelectedSubscriptionType>(
    SelectedSubscriptionType.DAY
  )
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.currentTarget.value as SubscriptionType)
  }

  return (
    <div className={s.page}>
      <div className={s.container}>
        <Typography as={'h3'} option={'h3'}>
          {'Current Subscription:'}
        </Typography>
        <div className={clsx(s.box, s.dopBox)}>
          <div className={s.content}>
            <Typography as={'span'} className={clsx(s.contentTitle, s.contentText)}>
              {'Expire at'}
            </Typography>
            <Typography as={'span'} className={s.contentText}>
              {'22.02.25'} {/*заменить  значениями*/}
            </Typography>
          </div>
          <div className={s.content}>
            <Typography as={'span'} className={clsx(s.contentTitle, s.contentText)}>
              {'Next payment'}
            </Typography>
            <Typography as={'span'} className={s.contentText}>
              {'22.03.25'} {/*заменить значениями*/}
            </Typography>
          </div>
        </div>
        <CheckBox label={'Auto-Renewal'} />
      </div>
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
              value={'Personal'}
            />
            <RadioBtn
              checked={selectedType === SubscriptionType.Bisiness}
              label={'Business'}
              name={'accountType'}
              onChange={handleTypeChange}
              value={'Bisiness'}
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
              />
              <RadioBtn
                checked={selectedSubscription === SelectedSubscriptionType.WEEKLY}
                label={'$50 per 7 Day'}
                name={'subscription'}
              />
              <RadioBtn
                checked={selectedSubscription === SelectedSubscriptionType.MONTHLY}
                label={'$100 per month'}
                name={'subscription'}
              />
            </div>
          </div>
          <div className={s.subscriptionPay}>
            <Button className={s.subscriptionPayBtn} variant={'bordered'}>
              <PaypalSvgrepoCom4 height={'100%'} viewBox={'-1 3 26 10'} width={'100%'} />
            </Button>
            <Typography as={'span'} option={'regular_text16'}>
              {'Or'}
            </Typography>
            <Button className={s.subscriptionPayBtn} variant={'bordered'}>
              <StripeSvgrepoCom4 height={'100%'} viewBox={'0 3 24 10'} width={'100%'} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
