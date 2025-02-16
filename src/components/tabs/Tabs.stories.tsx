import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

import s from './tabs.module.scss'
import { Typography } from '@/src/components/typography/Typography'
import clsx from 'clsx'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

type Tab = {
  title: string
  value: string
}

const mockTabs: Tab[] = [
  { title: 'General information', value: 'tabs1' },
  { title: 'Devices', value: 'tabs2' },
  { title: 'Account Management', value: 'tabs3' },
  { title: 'My payments', value: 'tabs4' },
]

const renderTabsList = (disabled = false) => (
  <TabsList loop>
    {mockTabs.map(tab => (
      <TabsTrigger key={tab.value} value={tab.value} disabled={disabled}>
        {tab.title}
      </TabsTrigger>
    ))}
  </TabsList>
)

export const Default: Story = {
  args: {},
  render: args => {
    return (
      <Tabs defaultValue={mockTabs[0].value} className={s.tabs}>
        {renderTabsList()}
        {mockTabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <Typography option={'h3'} className="p-4">
              {tab.title}
            </Typography>
          </TabsContent>
        ))}
      </Tabs>
    )
  },
}
export const Disabled: Story = {
  render: args => {
    return (
      <Tabs defaultValue={mockTabs[0].value} className={s.tabs}>
        {renderTabsList(true)}
        {mockTabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <Typography option={'h3'} className="p-4">
              {tab.title}
            </Typography>
          </TabsContent>
        ))}
      </Tabs>
    )
  },
}
export const Custom: Story = {
  render: args => {
    return (
      <Tabs defaultValue={mockTabs[0].value} className={clsx(s.tabs, s.customWidth)}>
        {renderTabsList()}
        {mockTabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <Typography option={'h3'} className="p-4">
              {tab.title}
            </Typography>
          </TabsContent>
        ))}
      </Tabs>
    )
  },
}
