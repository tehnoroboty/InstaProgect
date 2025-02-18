'use client'

import React from 'react'

import { AvatarBox } from '@/src/components/avatar/AvatarBox'
import { Button } from '@/src/components/button/Button'
import { Posts } from '@/src/components/postsGrid/Posts'
import { Typography } from '@/src/components/typography/Typography'

import s from './myProfile.module.scss'

import { profileData } from './data'

export const Profile = () => {
  return (
    <>
      <div className={s.profileContainer}>
        <AvatarBox size={'xl'} src={'data.avatars[0].url'} />
        <div className={s.profileDetails}>
          <div className={s.container}>
            <div className={s.profileInfo}>
              <div className={s.userNameContainer}>
                <Typography as={'h1'} option={'h1'}>
                  {profileData.firstName}
                </Typography>
                <Typography as={'h1'} option={'h1'}>
                  {profileData.lastName}
                </Typography>
              </div>
              <div className={s.followersStats}>
                <div className={s.followersStatItem}>
                  <Typography as={'span'} option={'bold_text14'}>
                    {profileData.followingCount}
                  </Typography>
                  <Typography as={'span'} option={'regular_text14'}>
                    {'Following'}
                  </Typography>
                </div>
                <div className={s.followersStatItem}>
                  <Typography as={'span'} option={'bold_text14'}>
                    {profileData.followersCount}
                  </Typography>
                  <Typography as={'span'} option={'regular_text14'}>
                    {'Followers'}
                  </Typography>
                </div>
                <div className={s.followersStatItem}>
                  <Typography as={'span'} option={'bold_text14'}>
                    {profileData.publicationsCount}
                  </Typography>
                  <Typography as={'span'} option={'regular_text14'}>
                    {'Publications'}
                  </Typography>
                </div>
              </div>
            </div>
            <div>
              <Button type={'button'} variant={'secondary'}>
                {'Profile Settings'}
              </Button>
            </div>
          </div>
          <Typography as={'p'} className={s.profileDescription} option={'regular_text16'}>
            {profileData.aboutMe}
          </Typography>
        </div>
      </div>
      <Posts posts={[]} />
    </>
  )
}
