import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetSearchUserQuery } from '@/src/shared/model/api/searchApi'
import { CustomerError, ItemSearch } from '@/src/shared/model/api/types'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'
import debounce from 'lodash/debounce'

const USERS_PER_PAGE = 12

export const useUserSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const [users, setUsers] = useState<ItemSearch[]>([])
  const [hasMore, setHasMore] = useState(true)

  const { inView, ref } = useInView({ threshold: 0.1 })
  const lastFetchedCursor = useRef<number | undefined>(undefined)
  const dispatch = useAppDispatch()

  const { data, error, isError, isFetching } = useGetSearchUserQuery({
    cursor,
    pageNumber: 1,
    pageSize: USERS_PER_PAGE,
    search: searchTerm,
  })

  // обновляем список пользователей после получения данных
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

  // очистка debounce на размонтирование
  useEffect(() => {
    return () => handleSearchChange.cancel()
  }, [handleSearchChange])

  // обработка ошибок
  useEffect(() => {
    if (isError) {
      const err = error as CustomerError

      dispatch(setAppError(err.data))
    }
  }, [isError, error, dispatch])

  return {
    handleSearchChange,
    hasMore,
    isError,
    isFetching,
    ref,
    users,
  }
}
