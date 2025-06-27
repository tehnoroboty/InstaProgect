import { Button } from '@/src/shared/ui/button/Button'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'

import s from '@/src/widgets/addCommentForm/addCommentForm.module.scss'

type Props = {
  onChange: (value: string) => void
  onSubmit: () => void
  value: string
}

export const AddCommentForm = ({ onChange, onSubmit, value }: Props) => {
  return (
    <div className={s.addComment}>
      <div className={s.textareaWrapper}>
        <TextArea
          className={s.textarea}
          label={''}
          onChange={() => {}}
          placeholder={'Add a Comment...'}
        />
      </div>
      <Button variant={'transparent'}>{'Publish'}</Button>
    </div>
  )
}
