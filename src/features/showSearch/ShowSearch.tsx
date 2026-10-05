'use client'

import { useUserSearch } from '@/src/shared/hooks/useUserSearch'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Input } from '@/src/shared/ui/input'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './showSearch.module.scss'

export const ShowSearch = () => {
  const { handleSearchChange, hasMore, isFetching, ref, users } = useUserSearch()

  return (
    <div className={s.page}>
      <div className={s.container}>
        <Typography as={'div'} className={s.searchText} option={'h1'}>
          Search
        </Typography>

        <div className={s.searchBox}>
          <Input onInput={handleSearchChange} placeholder={'Search'} type={'search'} />
        </div>

        <Typography option={'bold_text16'}>Recent requests</Typography>

        {isFetching && users.length === 0 && (
          <div className={s.loading}>
            <Loader size={15} />
          </div>
        )}

        {users?.length > 0 && (
          <div className={s.userBox}>
            {users?.map(user => (
              <div className={s.userCard} key={user.id}>
                <AvatarBox size={'s'} src={user.avatars?.[0]?.url || ''} />
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
                  >{`${user.firstName || '----'} ${user.lastName || '----'}`}</Typography>
                </div>
              </div>
            ))}

            {hasMore && <div ref={ref} />}
            <div className={s.wrapLoader}>
              {isFetching && <Loader color={'#4C8DFF'} size={15} />}
            </div>
          </div>
        )}

        {!isFetching && users.length === 0 && (
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
