'use client'

import { ComponentPropsWithoutRef } from 'react'
import { useDispatch } from 'react-redux'

import GitHub from '@/src/assets/componentsIcons/Github'
import { setAppError } from '@/src/store/Slices/appSlice'
import { useLazyGettingAccessThroughGithubQuery } from '@/src/store/services/authApi'

import s from './gitHubOAuthButton.module.scss'

type Props = {
  className?: string
  setDisabledButton: (value: boolean) => void
} & ComponentPropsWithoutRef<'button'>

export const GitHubOAuthButton = (props: Props) => {
  const { className, setDisabledButton, ...rest } = props

  const dispatch = useDispatch()

  const [gettingAccessThroughGithub, { error }] = useLazyGettingAccessThroughGithubQuery()
  const login = async () => {
    try {
      setDisabledButton(true)
      await gettingAccessThroughGithub({ redirect_url: 'http://localhost:3000' }).unwrap()
    } catch (error) {
      setDisabledButton(false)
      dispatch(setAppError({ error: error.error }))
    }
    // window.location.assign(
    //   `https://inctagram.work/api/v1/auth/github/login?redirect_url=http://localhost:3000/auth/`
    // )
  }

  return (
    <button className={className} onClick={login} type={'button'} {...rest}>
      <GitHub className={s.gitHub} height={36} viewBox={'0 0 24 24'} width={36} />
    </button>
  )
}
