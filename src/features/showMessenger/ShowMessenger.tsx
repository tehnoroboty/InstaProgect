'use client'

import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Input } from '@/src/shared/ui/input'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './ShowMessenger.module.scss'

export const ShowMessenger = () => {
  return (
    <div className={s.page}>
      <div className={s.container}>
        <Typography as={'div'} className={s.searchText} option={'h1'}>
          Messenger
        </Typography>
      </div>
      {/*{isFetching && users.length === 0 && (*/}
      {/*  <div className={s.loading}>*/}
      {/*    <Loader size={15} />*/}
      {/*  </div>*/}
      {/*)}*/}
      <div className={s.messengerWrapper}>
        <div className={s.dialoguePartners}>
          <div className={s.searchBox}>
            <Input
              className={s.input}
              onInput={() => {}}
              placeholder={'Input search'}
              type={'search'}
            />
          </div>
          <div className={s.dialoguePartner}>
            <AvatarBox size={'s'} />
            <div className={s.dialoguePartnerInfo}>
              <div>
                <Typography option={'regular_text14'}>NAME</Typography>
                <Typography className={s.grey} option={'small_text'}>
                  14:56
                </Typography>
              </div>
              <Typography className={s.grey} option={'small_text'}>
                Hi! How are you?
              </Typography>
            </div>
          </div>
        </div>
        <div className={s.dialogue}>
          <header className={s.header}>
            <AvatarBox size={'s'} />
            <Typography option={'regular_text16'}>NAME</Typography>
          </header>
          <div className={s.dialogueBody}>
            <div className={`${s.message} ${s.isMy}`}>
              <AvatarBox size={'s'} />
              <div className={s.text}>
                <Typography option={'regular_text14'}>Hi! How are you?</Typography>
                <Typography className={s.time} option={'small_text'}>
                  14:56
                </Typography>
              </div>
            </div>
            <div className={`${s.message}`}>
              <AvatarBox size={'s'} />
              <div className={s.text}>
                <Typography option={'regular_text14'}>Hi! How are you?</Typography>
                <Typography className={s.time} option={'small_text'}>
                  14:56
                </Typography>
              </div>
            </div>
          </div>
          <div className={s.footer}>
            <Input
              className={s.input}
              onInput={() => {}}
              placeholder={'Input search'}
              type={'search'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
