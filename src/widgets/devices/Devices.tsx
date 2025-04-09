import React, { useEffect, useState } from 'react'

import { DeviceType } from '@/src/entities/devices'
import {
  Brave,
  Chrome,
  Desktop,
  Explorer,
  Firefox,
  Microsoftedge,
  Mobile,
  Opera,
  Safari,
  Ucbrowser,
  Yandex,
} from '@/src/shared/assets/componentsIcons'
import LogOutOutline from '@/src/shared/assets/componentsIcons/LogOutOutline'
import {
  useDeviceLogOutMutation,
  useDevicesQuery,
  useTerminateAllSessionsMutation,
} from '@/src/shared/model/api/devicesApi'
import { ErrorDataType } from '@/src/shared/model/api/types'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { Button } from '@/src/shared/ui/button/Button'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from './devices.module.scss'

export const Devices = () => {
  const { data, isFetching } = useDevicesQuery()
  const [logOutDevice, { isError, isLoading }] = useDeviceLogOutMutation()
  const [terminateAllSessions, { isError: isErrorAllDelete, isLoading: isLoadingAllDelete }] =
    useTerminateAllSessionsMutation()
  const [currentDevice, setCurrentDevice] = useState<DeviceType | null>(null)
  const [otherDevices, setOtherDevices] = useState<DeviceType[]>([])
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [loadingDeviceId, setLoadingDeviceId] = useState<null | number>(null)

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

  const onClickLogout = async (id: number) => {
    setLoadingDeviceId(id)
    try {
      await logOutDevice(id).unwrap()
    } catch (error) {
      console.error(error)
      const err = error as ErrorDataType

      setErrorMessage(err.messages[0].message)
    } finally {
      setLoadingDeviceId(null)
    }
  }

  const onClickTerminateAllSessions = async () => {
    try {
      await terminateAllSessions().unwrap()
    } catch (error) {
      const err = error as ErrorDataType

      setErrorMessage(err.messages[0].message)
    }
  }

  const getBrowserName = (browserName: string) => {
    switch (browserName) {
      case 'Chrome':
        return <Chrome />
      case 'Firefox':
        return <Firefox />
      case 'Safari':
        return <Safari />
      case 'Opera':
        return <Opera />
      case 'Explorer':
        return <Explorer />
      case 'Brave':
        return <Brave />
      case 'Yandex':
        return <Yandex />
      case 'Edge':
        return <Microsoftedge />
      case 'UC Browser':
        return <Ucbrowser />
      default:
        return
    }
  }

  const osType = (osType: string) => {
    switch (osType) {
      case 'mobile':
        return <Mobile />
      case 'desktop':
        return <Desktop />
      case 'tablet':
        return <Mobile />
      case 'Macintosh':
        return <Desktop />
      default:
        return <Desktop />
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
      {(isError || isErrorAllDelete) && (
        <Alerts message={errorMessage || 'Session not found'} type={'error'} />
      )}
      <div className={s.container}>
        <Typography as={'h3'} option={'h3'}>
          {'Current devices'}
        </Typography>
        <div className={clsx(s.box, s.currentBox)}>
          <div className={s.browserBox}>{getBrowserName(currentDevice?.browserName!)}</div>
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
        <Button className={s.btn} onClick={onClickTerminateAllSessions} variant={'bordered'}>
          {'Terminate all other  session'}
        </Button>
      </div>
      {otherDevices.length > 0 && (
        <div className={s.containerForOther}>
          <Typography as={'h3'} option={'h3'}>
            {'Other devices'}
          </Typography>
          {otherDevices.map((device: DeviceType) => {
            return (
              <div className={s.box} key={device.deviceId}>
                <div className={s.browserBox}>{osType(device.deviceName)}</div>
                <div className={s.content}>
                  <Typography as={'span'} option={'bold_text16'}>
                    {device.osName}
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
                  disabled={
                    (loadingDeviceId === device.deviceId && isLoading) ||
                    isLoadingAllDelete ||
                    currentDevice?.deviceId === device.deviceId
                  }
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
