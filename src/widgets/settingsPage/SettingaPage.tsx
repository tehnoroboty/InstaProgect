'use client'

import React from 'react'

import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/ui/tabs'
import { AccountManagement } from '@/src/widgets/accountManager/AccountManagement'
import { Devices } from '@/src/widgets/devices/Devices'
import { GenerationInformation } from '@/src/widgets/generationInformation/GenerationInformation'
import { MyPayments } from '@/src/widgets/myPayments/MyPayments'
import { Tab } from '@/src/widgets/settingsPage/data'
import { useParams, usePathname, useRouter } from 'next/navigation'

import s from './settingsPage.module.scss'

const dataTabs: Tab[] = [
  {
    page: <GenerationInformation />,
    title: 'General information',
    value: 'general-information',
  },
  { page: <Devices />, title: 'Devices', value: 'devices' },
  {
    page: <AccountManagement />,
    title: 'Account Management',
    value: 'account-management',
  },
  { page: <MyPayments />, title: 'My payments', value: 'my-payments' },
]

export const SettingsPage = ({ userId }: { userId: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const currentTab = pathname.split('/').pop() || 'general-information'
  const isAuth = localStorage.getItem('accessToken')

  if (!isAuth) {
    router.push(AuthRoutes.LOGIN)
  }
  const handleTabChange = (newTab: string) => {
    router.push(`/profile/${userId}/settings/${newTab}`)
  }
  const renderTabsList = (disabled = false) => (
    <TabsList loop>
      {dataTabs.map(tab => (
        <TabsTrigger disabled={disabled} key={tab.value} value={tab.value}>
          {tab.title}
        </TabsTrigger>
      ))}
    </TabsList>
  )

  return (
    <div className={s.page}>
      <Tabs className={s.tabs} onValueChange={handleTabChange} value={currentTab}>
        {renderTabsList()}
        {dataTabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.page}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
