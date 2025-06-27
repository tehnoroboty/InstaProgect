'use client'

import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetSearchUserQuery } from '@/src/shared/model/api/followingApi'
import { CustomerError, ItemSearch } from '@/src/shared/model/api/types'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Input } from '@/src/shared/ui/input'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'
import debounce from 'lodash/debounce'

import s from './showSearch.module.scss'

const USERS_PER_PAGE = 12

export const ShowSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const [users, setUsers] = useState<ItemSearch[]>([])
  const [hasMore, setHasMore] = useState(true)

  const { inView, ref } = useInView({ threshold: 0.1 })
  const lastFetchedCursor = useRef<number | undefined>(undefined)

  const { data, error, isError, isFetching } = useGetSearchUserQuery({
    cursor,
    pageNumber: 1,
    pageSize: USERS_PER_PAGE,
    search: searchTerm,
  })

  // бновляем список пользователей после получения данных
  useEffect(() => {
    if (data) {
      setUsers(prev => (cursor === undefined ? data.items : [...prev, ...data.items]))

      setHasMore(!!data.nextCursor)
      lastFetchedCursor.current = cursor // сохраняем текущий курсор как уже использованный
    }
  }, [data])

  //  скролл вниз: если inView и есть что грузить — загружаем
  useEffect(() => {
    if (
      inView &&
      hasMore &&
      !isFetching &&
      data?.nextCursor !== undefined &&
      data.nextCursor !== lastFetchedCursor.current
    ) {
      setCursor(data.nextCursor) // именно от события скролла
    }
  }, [inView, hasMore, isFetching, cursor, data?.nextCursor])

  // обработка ввода в поиске с debounce
  const handleSearchChange = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        setSearchTerm(value)
        setCursor(undefined)
        setUsers([])
        setHasMore(true)
      }, 500),
    []
  )

  // очищаем таймер при размонтировании
  useEffect(() => {
    return () => {
      handleSearchChange.cancel()
    }
  }, [handleSearchChange])

  // обработка ошибки
  useEffect(() => {
    if (isError) {
      const err = error as CustomerError

      setErrorMessage(err.data?.messages?.[0]?.message || 'Something went wrong')
    }
  }, [isError, error])

  return (
    <div className={clsx(s.page)}>
      {isError && <Alerts message={errorMessage} position={'fixed'} type={'error'} />}

      <div className={s.container}>
        <Typography as={'div'} className={s.searchText} option={'h1'}>
          Search
        </Typography>

        <div className={s.searchBox}>
          <Input onInput={handleSearchChange} placeholder={'Search'} type={'search'} />
        </div>

        <Typography option={'bold_text16'}>Recent requests</Typography>

        {isFetching && users.length === 0 ? (
          <div className={s.loading}>
            <Loader size={15} />
          </div>
        ) : users?.length > 0 ? (
          <div className={s.userBox}>
            {users?.map(user => (
              <div className={s.userCard} key={user.id}>
                <AvatarBox size={'s'} src={user.avatars[0]?.url || ''} />
                <div>
                  <Typography
                    as={'a'}
                    className={s.userLink}
                    href={`/profile/${user.id}`}
                    option={'medium_text14'}
                  >
                    {user.userName}
                  </Typography>
                  <Typography
                    className={s.userName}
                    option={'regular_text14'}
                  >{`${user.firstName ?? '----'} ${user.lastName ?? '----'}`}</Typography>
                </div>
              </div>
            ))}

            {hasMore && <div ref={ref} />}
            <div className={s.wrapLoader}>
              {isFetching && (
                // <Loader size={10} />
                <Typography className={s.loaderText} option={'bold_text14'}>
                  Loading...
                </Typography>
              )}
            </div>
          </div>
        ) : (
          <div className={s.emptyState}>
            <div className={s.emptyContent}>
              <Typography className={s.emptyTitle} option={'bold_text14'}>
                Oops! This place looks empty!
              </Typography>
              <Typography className={s.emptySubtitle} option={'small_text'}>
                No recent requests
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
