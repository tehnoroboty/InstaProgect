import ImageOutline from '@/src/assets/componentsIcons/ImageOutline'
import * as Avatar from '@radix-ui/react-avatar'
import clsx from 'clsx'

import s from './avatar.module.scss'

type Props = {
  className?: string
  size?: { height: string; width: string }
  src?: string
}

export const AvatarBox = ({
  className,
  size = { height: '192px', width: '192px' },
  src,
}: Props) => {
  const { height, width } = size

  return (
    <Avatar.Root className={clsx(s.root, className)} style={{ height, width }}>
      <Avatar.Image alt={'Avatar'} className={s.image} src={src} />
      <Avatar.Fallback className={s.fallback}>
        <ImageOutline color={'white'} height={48} width={48} />
      </Avatar.Fallback>
    </Avatar.Root>
  )
}
