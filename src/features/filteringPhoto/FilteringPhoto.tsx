'use client'

import React, { useState } from 'react'

import { CroppingPhoto } from '@/src/features/croppingPhoto/CroppingPhoto'
import { PublishPhoto } from '@/src/features/publishPhoto/PublishPhoto'
import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Arousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { ExitModal } from '@/src/widgets/exitModal/ExitModal'
import {
  PinturaDefaultImageWriterResult,
  createDefaultImageReader,
  createDefaultImageWriter,
  filterInvert,
  locale_en_gb,
  plugin_filter,
  plugin_filter_defaults,
  plugin_filter_locale_en_gb,
  setPlugins,
} from '@pqina/pintura'
import { PinturaEditor } from '@pqina/react-pintura'
import { Title } from '@radix-ui/react-dialog'

import '@pqina/pintura/pintura.css'

import s from '@/src/features/filteringPhoto/filteringPhoto.module.scss'

setPlugins(plugin_filter, plugin_filter_defaults)

const editorConfig = {
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),

  locale: {
    ...locale_en_gb,
    ...plugin_filter_locale_en_gb,
  },
}

type Props = {
  photos: string[]
}

export const FilteringPhoto = ({ photos }: Props) => {
  const [inlineResult, setInlineResult] = useState<string | undefined>(undefined)
  const [exitModal, setExitModal] = useState<boolean>(false)
  const [openModal, setOpenModel] = useState<boolean>(true)
  const [showPublishPhoto, setShowPublishPhoto] = useState<boolean>(false)
  const [showCroppingPhoto, setShowCroppingPhoto] = useState<boolean>(false)
  const closeModal = () => setOpenModel(false)

  const handleNextClick = () => {
    closeModal()
    setShowPublishPhoto(true)
  }

  const handleBackClick = () => {
    closeModal()
    setShowCroppingPhoto(true)
  }

  const handleEditorProcess = (res: PinturaDefaultImageWriterResult) => {
    setInlineResult(URL.createObjectURL(res.dest))
  }

  if (showPublishPhoto) {
    return <PublishPhoto />
  }

  if (showCroppingPhoto) {
    return <CroppingPhoto photos={photos} />
  }

  return (
    <>
      <Dialog
        className={s.modal}
        isSimple
        onClose={() => {
          setExitModal(true)
        }}
        open={openModal}
      >
        <div className={s.header}>
          <Button className={s.buttonBack} onClick={handleBackClick} variant={'transparent'}>
            <ArrowIosBackOutline color={'white'} />
          </Button>
          <Title asChild>
            <Typography as={'h1'} option={'h1'}>
              {'Filters'}
            </Typography>
          </Title>
          <Button onClick={handleNextClick} variant={'transparent'}>
            {'Next'}
          </Button>
        </div>

        <div className={s.contentModal}>
          <Arousel
            list={photos}
            renderItem={photo => (
              <PinturaEditor
                {...editorConfig}
                filterFunctions={{
                  ...plugin_filter_defaults.filterFunctions,
                  blue: () => {
                    return [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0]
                  },
                  invert: filterInvert,
                }}
                filterOptions={[
                  ...plugin_filter_defaults.filterOptions,
                  ['Custom', [['blue', 'Blue']]],
                ]}
                onProcess={handleEditorProcess}
                src={photo}
              />
            )}
          />
        </div>
      </Dialog>
      <ExitModal
        onCloseModal={() => setExitModal(false)}
        onCloseParentModal={closeModal}
        onSaveDraft={() => {}}
        open={exitModal}
      />
    </>
  )
}
