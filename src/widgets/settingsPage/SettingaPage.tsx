'use client'

import React from 'react'

import { Tabs, TabsContent } from '@/src/shared/ui/tabs'
import { renderTabsList } from '@/src/shared/ui/tabs/Tabs.stories'
import { AccountManagement } from '@/src/widgets/accountManager/AccountManagement'
import { Devices } from '@/src/widgets/devices/Devices'
import { GenerationInformation } from '@/src/widgets/generationInformation/GenerationInformation'
import { Tab } from '@/src/widgets/settingsPage/data'

import s from './settingsPage.module.scss'

const dataTabs: Tab[] = [
  {
    page: <GenerationInformation />,
    title: 'General information',
    value: 'tabs1',
  },
  { page: <Devices />, title: 'Devices', value: 'tabs2' },
  {
    page: <AccountManagement />,
    title: 'Account Management',
    value: 'tabs3',
  },
  { page: <GenerationInformation />, title: 'My payments', value: 'tabs4' },
]

export const SettingsPage = () => {
  return (
    <div className={s.page}>
      <Tabs className={s.tabs} defaultValue={dataTabs[0].value}>
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
