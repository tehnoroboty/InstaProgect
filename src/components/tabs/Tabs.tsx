'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs'
import s from './tabs.module.scss'
import clsx from 'clsx'

const Tabs = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root ref={ref} className={clsx(s.root, className)} {...props} />
  )
)

Tabs.displayName = 'Tabs'

const TabsList = forwardRef<ElementRef<typeof List>, ComponentPropsWithoutRef<typeof List>>(
  ({ className, ...props }, ref) => (
    <List ref={ref} className={clsx(s.list, className)} {...props} />
  )
)
TabsList.displayName = List.displayName

const TabsTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger ref={ref} className={clsx(s.trigger, className)} {...props} />
))
TabsTrigger.displayName = Trigger.displayName

const TabsContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content ref={ref} className={clsx(s.content, className)} {...props} />
))
TabsContent.displayName = Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
