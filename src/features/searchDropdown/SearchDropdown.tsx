import { ForwardedRef, forwardRef } from 'react'

import { ItemSearch } from '@/src/entities/search/types'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { useRouter } from 'next/navigation'

import s from './searchDropdown.module.scss'

type Props = {
  hasMore: boolean
  isFetching: boolean
  onClose?: () => void
  users: ItemSearch[]
}

export const SearchDropdown = forwardRef<HTMLDivElement, Props>(
  ({ hasMore, isFetching, onClose, users }, ref: ForwardedRef<HTMLDivElement>) => {
    const router = useRouter()

    if (users.length > 0) {
      return (
        <div>
          {users.map(user => (
            <div
              className={s.userCard}
              key={user.id}
              onClick={() => {
                router.push(`/messenger?dialogId=${user.id}`)
                onClose?.()
              }}
            >
              <AvatarBox size={'s'} src={user.avatars?.[0]?.url || ''} />
              <div>
                <Typography option={'medium_text14'}>{user.userName}</Typography>
                <Typography option={'regular_text14'}>
                  {`${user.firstName || '----'} ${user.lastName || '----'}`}
                </Typography>
              </div>
            </div>
          ))}

          {hasMore && <div ref={ref} />}
          {isFetching && (
            <div className={s.loaderWrap}>
              <Loader size={15} />
            </div>
          )}
        </div>
      )
    }

    return (
      !isFetching && (
        <div className={s.dropdownEmpty}>
          <Typography option={'small_text'}>No results found</Typography>
        </div>
      )
    )
  }
)

SearchDropdown.displayName = 'SearchDropdown'
