import React, { ReactNode, useState } from 'react'

import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import {
  ModalCommentsSection,
  ModalCommentsSectionProps,
} from '@/src/widgets/commentsSection/ModalCommentsSection'
import { StaticImageData } from 'next/image'

import s from './modalPost.module.scss'

type ListType = {
  id: string
  img: StaticImageData | string
}

type Props = {
  list: ListType[]
  renderItem: (item: ListType) => ReactNode
} & ModalCommentsSectionProps

export default function ModalPost(props: Props) {
  const { avatars, commentsData, list, post, renderItem } = props

  const [showDialog, setShowDialog] = useState(true)

  const toggleModalHandler = () => {
    setShowDialog(!showDialog)
  }

  return (
    <>
      <Dialog
        className={s.dialog}
        closeClassName={s.closeClassName}
        onClose={toggleModalHandler}
        open={showDialog}
      >
        <div className={s.container}>
          <Carousel list={list} renderItem={renderItem} size={'large'} />
          <ModalCommentsSection avatars={avatars} commentsData={commentsData} post={post} />
        </div>
      </Dialog>
    </>
  )
}
