import ImageOutline from '@/src/assets/componentsIcons/ImageOutline'
import * as Avatar from '@radix-ui/react-avatar'
import clsx from 'clsx'

import s from './avatar.module.scss'

type SizeType = 'l' | 'm' | 's' | 'xl' | 'xs' | 'xxs'

type Props = {
  className?: string
  size?: SizeType
  src?: string
}

export const AvatarBox = ({ className, size = 'xl', src }: Props) => {
  const imageSize = size === 'xl' || size === 'l' ? 48 : 24

  return (
    <Avatar.Root className={clsx(size && s[`img-size-${size}`], s.root, className)}>
      <Avatar.Image alt={'Avatar'} className={s.image} src={src} />
      <Avatar.Fallback className={s.fallback}>
        <ImageOutline
          className={s.fallbackImage}
          color={'white'}
          height={imageSize}
          width={imageSize}
        />
      </Avatar.Fallback>
    </Avatar.Root>
  )
}
