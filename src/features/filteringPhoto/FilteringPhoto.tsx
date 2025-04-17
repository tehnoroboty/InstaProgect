'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { CroppingPhoto } from '@/src/features/croppingPhoto/CroppingPhoto'
import { PublishPhoto } from '@/src/features/publishPhoto/PublishPhoto'
import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import { useBoolean } from '@/src/shared/hooks/useBoolean'
import { setIsPostModalOpen } from '@/src/shared/model/slices/modalSlice'
import { Button } from '@/src/shared/ui/button/Button'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { ExitModal } from '@/src/widgets/exitModal/ExitModal'
import {
  type ColorMatrix,
  type Filter,
  type PinturaDefaultImageWriterResult,
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

const customFilterFunctions: Record<string, Filter> = {
  ...plugin_filter_defaults.filterFunctions,
  blue: (): ColorMatrix => [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0],
  invert: filterInvert,
}

const customFilterOptions = [
  ...plugin_filter_defaults.filterOptions,
  ['Custom', [['blue', 'Custom']]],
]

type Props = {
  photos: string[]
}

export const FilteringPhoto = ({ photos }: Props) => {
  const exitModal = useBoolean()
  const openModal = useBoolean(true)
  const showPublishPhoto = useBoolean()
  const showCroppingPhoto = useBoolean()
  const dispatch = useDispatch()

  const [editedPhotos, setEditedPhotos] = useState<string[]>(photos)

  const handleNextClick = () => {
    openModal.setFalse()
    showPublishPhoto.setTrue()
  }

  const handleBackClick = () => {
    openModal.setFalse()
    showCroppingPhoto.setTrue()
  }

  const handleEditorProcess = (res: PinturaDefaultImageWriterResult, index: number) => {
    const newUrl = URL.createObjectURL(res.dest)

    setEditedPhotos(prevPhotos => {
      const updatedPhotos = [...prevPhotos]

      updatedPhotos[index] = newUrl

      return updatedPhotos
    })
  }

  if (showPublishPhoto.value) {
    return <PublishPhoto photos={editedPhotos} />
  }

  if (showCroppingPhoto.value) {
    return <CroppingPhoto photos={editedPhotos} />
  }

  return (
    <>
      <Dialog className={s.modal} isSimple onClose={exitModal.setTrue} open={openModal.value}>
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
          {editedPhotos.length > 1 ? (
            <Carousel
              list={editedPhotos}
              renderItem={photo => {
                const index = editedPhotos.indexOf(photo)

                return (
                  <PinturaEditor
                    {...editorConfig}
                    filterFunctions={customFilterFunctions}
                    filterOptions={customFilterOptions}
                    onProcess={res => handleEditorProcess(res, index)}
                    src={photo}
                  />
                )
              }}
              size={'small'}
            />
          ) : (
            <PinturaEditor
              {...editorConfig}
              filterFunctions={customFilterFunctions}
              filterOptions={customFilterOptions}
              onProcess={res => handleEditorProcess(res, 0)}
              src={photos[0]}
            />
          )}
        </div>
      </Dialog>
      <ExitModal
        modalType={'post'}
        onCloseModal={exitModal.setFalse}
        onCloseParentModal={() => dispatch(setIsPostModalOpen({ isOpen: false }))}
        onSaveDraft={() => {}}
        open={exitModal.value}
      />
    </>
  )
}
