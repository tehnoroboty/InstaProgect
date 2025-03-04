import { timeSince } from '@/src/shared/lib/timeSince'

import s from './creationTime.module.scss'

type Props = {
  createdAt: string
  type: 'publicationDate' | 'timeSince'
}
export const CreationTime = ({ createdAt, type }: Props) => {
  const timeToDisplay = type === 'timeSince' ? timeSince(createdAt) : createdAt

  return <div className={s.creationTime}>{timeToDisplay}</div>
}
