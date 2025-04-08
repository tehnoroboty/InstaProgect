import React, { useEffect, useState } from 'react'

import { DeviceType } from '@/src/entities/devices'
import LogOutOutline from '@/src/shared/assets/componentsIcons/LogOutOutline'
import { useDevicesQuery } from '@/src/shared/model/api/devicesApi'
import { Button } from '@/src/shared/ui/button/Button'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { parseISO } from 'date-fns'

import s from './devices.module.scss'

export const Devices = () => {
  const { data, isFetching } = useDevicesQuery()
  const [currentDevice, setCurrentDevice] = useState<DeviceType | null>(null)
  const [otherDevices, setOtherDevices] = useState<DeviceType[]>([])

  const parseISOAndFormat = (dateString: string) => {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  }

  useEffect(() => {
    if (data) {
      setCurrentDevice(data.current)
      if (data.others) {
        setOtherDevices(data.others)
      }
    }
  }, [data, isFetching])

  const onClickLogout = (id: number) => {
    console.log(id)
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
      <div className={s.container}>
        <Typography as={'h3'} option={'h3'}>
          {'Current devices'}
        </Typography>
        <div className={s.box}>
          <div></div>
          <div className={s.content}>
            <Typography as={'span'} option={'bold_text16'}>
              {currentDevice?.browserName}
            </Typography>
            <Typography
              as={'span'}
              option={'regular_text14'}
            >{`IP: ${currentDevice?.ip}`}</Typography>
          </div>
        </div>
        <Button className={s.btn} variant={'bordered'}>
          {'Terminate all other  session'}
        </Button>
      </div>
      {otherDevices.length > 0 && (
        <div className={s.container}>
          <Typography as={'h3'} option={'h3'}>
            {'Other devices'}
          </Typography>
          {otherDevices.map((device: DeviceType) => {
            return (
              <div className={s.box} key={device.deviceId}>
                <div></div>
                <div className={s.content}>
                  <Typography as={'span'} option={'bold_text16'}>
                    {device.browserName}
                  </Typography>
                  <Typography
                    as={'span'}
                    option={'regular_text14'}
                  >{`IP: ${device.ip}`}</Typography>
                  <Typography
                    as={'span'}
                    option={'small_text'}
                  >{`Last visit: ${parseISOAndFormat(device.lastActive)}`}</Typography>
                </div>
                <Button
                  className={s.btn}
                  onClick={() => onClickLogout(device.deviceId)}
                  variant={'transparent'}
                >
                  <LogOutOutline />
                  {'Log Out'}
                </Button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
