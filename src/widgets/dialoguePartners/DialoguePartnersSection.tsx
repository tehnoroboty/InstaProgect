import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { SearchDropdown } from '@/src/features/searchDropdown/SearchDropdown'
import { useUserSearch } from '@/src/shared/hooks/useUserSearch'
import { Input } from '@/src/shared/ui/input'
import { DialoguePartnersList } from '@/src/widgets/dialoguePartners/dialoguePartner/DialoguePartnersList'

import s from './dialoguePartners.module.scss'

export const DialoguePartnersSection = () => {
  const { handleSearchChange, hasMore, isFetching, ref, users } = useUserSearch()

  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e)
    setIsOpen(true)
  }

  return (
    <div className={s.dialoguePartners} ref={wrapperRef}>
      <div className={s.searchBox}>
        <Input
          className={s.input}
          onInput={onInputChange}
          placeholder={'Input search'}
          type={'search'}
        />
        {isOpen && (
          <SearchDropdown
            hasMore={hasMore}
            isFetching={isFetching}
            onClose={() => setIsOpen(false)}
            ref={ref}
            users={users}
          />
        )}
      </div>
      {!isOpen && <DialoguePartnersList />}
    </div>
  )
}
