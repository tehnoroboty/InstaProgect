import React, {ReactNode, useState} from 'react'

import {Carousel} from '@/src/shared/ui/carousel/Carousel'
import {Dialog} from '@/src/shared/ui/dialog'
import {
  ModalCommentsSection,
  ModalCommonSectionProps,
} from '@/src/widgets/commentsSection/ModalCommentsSection'
import Image from 'next/image'

import s from './modalPostComments.module.scss'
import sliderImage from "@/src/shared/ui/carousel/assets/slider.jpg";


type Props = ModalCommonSectionProps

export default function ModalPostComments(props: Props) {
  const {avatars, commentsData, post} = props

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
          <Carousel list=[
            {id: 'slide1', img: sliderImage},
            {id: 'slide1', img: sliderImage},
            {id: 'slide1', img: sliderImage},
            ],
            renderItem= {(item: any) => <Image alt={'image'} src={item.img}/>}/>
          <ModalCommentsSection avatars={avatars} commentsData={commentsData} post={post}/>
        </div>
      </Dialog>
    </>
  )
}
