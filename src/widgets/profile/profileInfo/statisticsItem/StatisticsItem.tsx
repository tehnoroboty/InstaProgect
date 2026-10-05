import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from '@/src/widgets/profile/profileInfo/statisticsItem/statisticsItem.module.scss'

type Props = {
  clickable?: boolean
  count: number
  onClick?: () => void
  title: string
}

export const StatisticsItem = ({ clickable = true, count, onClick, title }: Props) => {
  return (
    <div
      className={clsx(s.statisticsItem, clickable && s.clickable)}
      onClick={clickable ? onClick : undefined}
    >
      <Typography as={'span'} className={s.statisticsText} option={'bold_text14'}>
        {count}
      </Typography>
      <Typography as={'span'} className={s.statisticsText} option={'regular_text14'}>
        {title}
      </Typography>
    </div>
  )
}
