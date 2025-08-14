import { Input } from '@/src/shared/ui/input'
import { DialoguePartner } from '@/src/widgets/dialoguePartners/dialoguePartner/DialoguePartner'

import s from './dialoguePartners.module.scss'

export const DialoguePartners = () => {
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
      <DialoguePartner />
    </div>
  )
}
