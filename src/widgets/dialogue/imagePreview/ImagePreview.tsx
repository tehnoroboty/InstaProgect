import CloseOutline from '@/src/shared/assets/componentsIcons/CloseOutline'
import PlusCircleOutline from '@/src/shared/assets/componentsIcons/PlusCircleOutline'
import { Button } from '@/src/shared/ui/button/Button'
import clsx from 'clsx'
import Image from 'next/image'

import s from './imagePreview.module.scss'

type Props = {
  className?: string
  files: File[]
  onAddMore: () => void
  onRemove: (index: number) => void
}

export const ImagePreview = ({ className, files, onAddMore, onRemove }: Props) => {
  if (files.length === 0) {
    return null
  }

  return (
    <div className={clsx(s.previewContainer, className)}>
      <div className={s.previewList}>
        {files.map((file, index) => (
          <div className={s.previewItem} key={`${file.name}-${index}`}>
            <Image
              alt={`Preview ${index + 1}`}
              className={s.previewImage}
              height={36}
              src={URL.createObjectURL(file)}
              width={36}
            />
            <Button
              className={s.removeButton}
              onClick={() => onRemove(index)}
              variant={'transparent'}
            >
              <CloseOutline className={s.removeIcon} />
            </Button>
          </div>
        ))}
        {files.length < 10 && (
          <Button className={s.addMoreButton} onClick={onAddMore} variant={'transparent'}>
            <PlusCircleOutline className={s.plusCircleIcon} />
          </Button>
        )}
      </div>
    </div>
  )
}
