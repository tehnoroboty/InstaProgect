import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './tabs.module.scss'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof Tabs>

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
      <TabsTrigger disabled={disabled} key={tab.value} value={tab.value}>
        {tab.title}
      </TabsTrigger>
    ))}
  </TabsList>
)

export const Default: Story = {
  args: {},
  render: args => {
    return (
      <Tabs className={s.tabs} defaultValue={mockTabs[0].value}>
        {renderTabsList()}
        {mockTabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <Typography className={'p-4'} option={'h3'}>
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
      <Tabs className={s.tabs} defaultValue={mockTabs[0].value}>
        {renderTabsList(true)}
        {mockTabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <Typography className={'p-4'} option={'h3'}>
              {tab.title}
            </Typography>
          </TabsContent>
        ))}
      </Tabs>
    )
  },
}
