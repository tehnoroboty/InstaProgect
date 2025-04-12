import React, { ReactNode, useState } from 'react'

import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import {
  ModalCommentsSection,
  ModalCommentsSectionProps,
} from '@/src/widgets/commentsSection/ModalCommentsSection'
import { StaticImageData } from 'next/image'

import s from './modalPostComments.module.scss'

type ListType = {
  id: string
  img: StaticImageData | string
}

type Props = {
  list: ListType[]
  renderItem: (item: ListType) => ReactNode
} & ModalCommentsSectionProps

export default function ModalPostComments(props: Props) {
  const { avatars, commentsData, list, post, renderItem } = props

  const [showDialog, setShowDialog] = useState(true)

  const openModalHandler = () => {
    setShowDialog(true)
  }

  const closeModalHandler = () => {
    setShowDialog(false)
  }

  return (
    <>
      <Dialog
        className={s.dialog}
        closeClassName={s.closeClassName}
        onClose={closeModalHandler}
        open={showDialog}
      >
        <div className={s.container}>
          <Carousel list={list} renderItem={renderItem} />
          <ModalCommentsSection avatars={avatars} commentsData={commentsData} post={post} />
        </div>
      </Dialog>
    </>
  )
}
