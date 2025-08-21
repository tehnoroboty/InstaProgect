import { Input } from '@/src/shared/ui/input'
import { DialoguePartnersList } from '@/src/widgets/dialoguePartners/dialoguePartner/DialoguePartnersList'

import s from './dialoguePartners.module.scss'

export const DialoguePartnersSection = () => {
  return (
    <div className={s.dialoguePartners}>
      <div className={s.searchBox}>
        <Input
          className={s.input}
          onInput={() => {}}
          placeholder={'Input search'}
          type={'search'}
        />
      </div>
      <DialoguePartnersList />
    </div>
  )
}
