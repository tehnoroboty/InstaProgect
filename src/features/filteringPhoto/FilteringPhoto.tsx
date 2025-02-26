'use client'

import React, { useState } from 'react'

import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { Typography } from '@/src/shared/ui/typography/Typography'
// Import the editor functionality
import {
  // Import the default image reader and writer
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,
  filterInvert,
  // The user interface and plugin locale objects
  locale_en_gb,
  // Import the default configuration for the markup editor and finetune plugins
  markup_editor_defaults,
  // to import the markup editor locale and the shape preprocessor
  markup_editor_locale_en_gb,
  // The plugins we want to use
  plugin_filter,
  plugin_filter_defaults,
  plugin_filter_locale_en_gb,
  setPlugins,
} from '@pqina/pintura'
// Import the editor component from `react-pintura`
import { PinturaEditor } from '@pqina/react-pintura'
import { Title } from '@radix-ui/react-dialog'

// Import the editor styles
import '@pqina/pintura/pintura.css'

import s from '@/src/features/croppingPhoto/croppingPhoto.module.scss'

// This registers the plugins with Pintura Image Editor
setPlugins(plugin_filter, plugin_filter_defaults)

// Create our editor configuration
const editorConfig = {
  // This will read the image data (required)
  imageReader: createDefaultImageReader(),

  // This will write the output image
  imageWriter: createDefaultImageWriter(),

  // The markup editor default options, tools, shape style controls
  ...markup_editor_defaults,

  // The icons and labels to use in the user interface (required)
  locale: {
    ...locale_en_gb,
    ...plugin_filter_locale_en_gb,
    ...markup_editor_locale_en_gb,
  },

  // This handles complex shapes like arrows / frames
  shapePreprocessor: createDefaultShapePreprocessor(),
}

type Props = {
  photo: string
}

export const FilteringPhoto = ({ photo }: Props) => {
  const [inlineResult, setInlineResult] = useState<string | undefined>(undefined)

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
        <PinturaEditor
          {...editorConfig}
          filterFunctions={{
            ...plugin_filter_defaults.filterFunctions,
            blue: () => {
              return [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0]
            },
            invert: filterInvert,
          }}
          filterOptions={[...plugin_filter_defaults.filterOptions, ['Custom', [['blue', 'Blue']]]]}
          onProcess={res => setInlineResult(URL.createObjectURL(res.dest))}
          src={photo}
        />
      </div>
    </Dialog>
  )
}
