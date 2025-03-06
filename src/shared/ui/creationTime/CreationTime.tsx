import { timeSince } from '@/src/shared/lib/timeSince'

import s from './creationTime.module.scss'

type Props = {
  createdAt: string
}
export const CreationTime = ({ createdAt }: Props) => {
  return <div className={s.creationTime}>{timeSince(createdAt)}</div>
}
