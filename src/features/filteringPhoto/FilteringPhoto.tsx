'use client'

import React, { useState } from 'react'

import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Arousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { Typography } from '@/src/shared/ui/typography/Typography'
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

  const handleEditorProcess = (res: PinturaDefaultImageWriterResult) => {
    console.log(res)
    setInlineResult(URL.createObjectURL(res.dest))
  }

  return (
    <Dialog className={s.modal} isSimple onClose={() => {}} open>
      <div className={s.header}>
        <Button className={s.buttonBack} onClick={() => {}} variant={'transparent'}>
          <ArrowIosBackOutline color={'white'} />
        </Button>
        <Title asChild>
          <Typography as={'h1'} option={'h1'}>
            {'Filters'}
          </Typography>
        </Title>
        <Button variant={'transparent'}>{'Next'}</Button>
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
  )
}
