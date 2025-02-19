'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Content, List, Root, Trigger } from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './tabs.module.scss'

const Tabs = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => (
    <Root className={clsx(s.root, className)} ref={ref} {...props} />
  )
)

Tabs.displayName = 'Tabs'

const TabsList = forwardRef<ElementRef<typeof List>, ComponentPropsWithoutRef<typeof List>>(
  ({ className, ...props }, ref) => (
    <List className={clsx(s.list, className)} ref={ref} {...props} />
  )
)

TabsList.displayName = List.displayName

const TabsTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger className={clsx(s.trigger, className)} ref={ref} {...props} />
))

TabsTrigger.displayName = Trigger.displayName

const TabsContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content className={clsx(s.content, className)} ref={ref} {...props} />
))

TabsContent.displayName = Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
