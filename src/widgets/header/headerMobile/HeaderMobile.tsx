import * as React from 'react'
import { useId, useState } from 'react'

import {
  BookmarkOutline,
  LogOutOutline,
  MoreHorizontalOutline,
  SettingsOutline,
  TrendingUpOutline,
} from '@/src/shared/assets/componentsIcons'
import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useLogoutMutation } from '@/src/shared/model/api/authApi'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { Dropdown } from '@/src/shared/ui/dropdown/Dropdown'
import { DropdownItem } from '@/src/shared/ui/dropdown/dropdownItem/DropdownItem'
import { SelectLanguage } from '@/src/shared/ui/select/SelectLanguage/SelectLanguage'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { MenuItemType } from '@/src/widgets/navigationPanel/NavigationPanel'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import s from './headerMobile.module.scss'

type Props = {
  isLoggedIn?: boolean
  notification?: boolean
  title: string
}

export const HeaderMobile = (props: Props) => {
  const { isLoggedIn = true, title } = props
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [logout, { isLoading }] = useLogoutMutation()
  const id = useId()

  const route = useRouter()

  const onClickHandler = () => {
    setIsModalOpen(true)
  }

  const onLogoutConfirm = async () => {
    await logout().unwrap()
    setIsModalOpen(false)
    route.push(AuthRoutes.LOGIN)
  }

  const menuHeaderMobile: MenuItemType[] = [
    {
      href: '/statistics',
      icon: TrendingUpOutline,
      title: 'Statistics',
    },
    {
      href: '/favorites',
      icon: BookmarkOutline,
      title: 'Favorites',
    },
    { href: '/settings', icon: SettingsOutline, title: 'Profile Settings' },
    {
      icon: LogOutOutline,
      onClick: () => {
        onClickHandler()
      },
      title: 'Log Out',
    },
  ]

  const renderItem = (item: any) => (
    <DropdownItem
      Icon={item.icon}
      href={item.href}
      key={id}
      onClick={item.onClick}
      title={item.title}
    />
  )
  const trigger = (
    <button aria-label={'Customize options'} type={'button'}>
      <MoreHorizontalOutline height={24} viewBox={`1 3 20 20`} />
    </button>
  )

  return (
    <div className={s.container}>
      <Link href={AuthRoutes.HOME}>
        <Typography as={'h1'} option={'Large'}>
          {title}
        </Typography>
      </Link>
      <div className={s.headerActions}>
        <SelectLanguage />
        {isLoggedIn && (
          <>
            <Dropdown list={menuHeaderMobile} renderItem={renderItem} trigger={trigger} />
            <Dialog
              className={s.modal}
              modalTitle={'Log Out'}
              onClose={() => setIsModalOpen(false)}
              open={isModalOpen}
            >
              <div className={s.contentModal}>
                <Typography as={'span'} option={'regular_text16'}>
                  {`Are you really want to log out of your account email?`}
                </Typography>
                <div className={s.modalActions}>
                  <Button
                    className={s.btnModal}
                    disabled={isLoading}
                    onClick={onLogoutConfirm}
                    variant={'secondary'}
                  >
                    {'Yes'}
                  </Button>
                  <Button
                    className={s.btnModal}
                    onClick={() => setIsModalOpen(false)}
                    variant={'primary'}
                  >
                    {'No'}
                  </Button>
                </div>
              </div>
            </Dialog>
          </>
        )}
      </div>
    </div>
  )
}
