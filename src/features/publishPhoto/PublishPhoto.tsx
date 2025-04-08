'use client'

import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { FilteringPhoto } from '@/src/features/filteringPhoto/FilteringPhoto'
import { urlToFile } from '@/src/features/publishPhoto/hooks/uploadPhoto'
import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import PinIcon from '@/src/shared/assets/componentsIcons/PinOutline'
import { useBoolean } from '@/src/shared/hooks/useBoolean'
import { AppRoutes } from '@/src/shared/lib/constants/routing'
import {
  useCreateImageForPostMutation,
  useCreateNewPostMutation,
} from '@/src/shared/model/api/postsApi'
import { CustomerError, RequestPostsType } from '@/src/shared/model/api/types'
import { useGetMyProfileQuery } from '@/src/shared/model/api/usersApi'
import { setIsModalOpen } from '@/src/shared/model/slices/modalSlice'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { Button } from '@/src/shared/ui/button/Button'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { Input } from '@/src/shared/ui/input'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { ExitModal } from '@/src/widgets/exitModal/ExitModal'
import { Title } from '@radix-ui/react-dialog'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import s from './publishPhoto.module.scss'
import { setLastPostId } from '@/src/shared/model/slices/postsSlice'

type Props = {
  photos: string[]
}

export const PublishPhoto = ({ photos }: Props) => {
  const { data: userProfile } = useGetMyProfileQuery()
  const openModal = useBoolean(true)
  const dispatch = useDispatch()
  const router = useRouter()
  const exitModal = useBoolean()
  const showFilteringPhoto = useBoolean()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [addPhotosForPost, { isError: isErrorForPhoto, isLoading: isLoadingForPhoto }] =
    useCreateImageForPostMutation()
  const [addPost, { isError, isLoading }] = useCreateNewPostMutation()

  const onClickPublishHandler = async () => {
    try {
      const files = await Promise.all(
        photos.map((photo, index) => urlToFile(photo, `photo_${index + 1}.jpg`))
      )
      const uploadResults = await Promise.all(
        files.map(file => addPhotosForPost({ file }).unwrap())
      )

      const uploadIds = uploadResults
        .map(result => {
          if (result.images && Array.isArray(result.images)) {
            return result.images.map(image => ({ uploadId: image.uploadId }))
          }

          return []
        })
        .flat()

      if (uploadIds.length > 0) {
        const publishData: RequestPostsType = {
          childrenMetadata: uploadIds,
          description: value,
        }

        await addPost(publishData).unwrap()

        openModal.setFalse()

        router.push(`${AppRoutes.PROFILE}/${userProfile?.id}`)
      } else {
        console.warn('No files were uploaded successfully.')
      }
    } catch (error) {
      const err = error as CustomerError
      const errorMessage = err.data?.messages[0]

      setErrorMessage(errorMessage?.message)
    }
  }

  const onChangeValue = () => {
    if (textareaRef.current) {
      setValue(textareaRef.current.value)
    }
  }

  const handleBackClick = () => {
    openModal.setFalse()
    showFilteringPhoto.setTrue()
  }

  if (showFilteringPhoto.value) {
    return <FilteringPhoto photos={photos} />
  }

  return (
    <>
      {isError ||
        (isErrorForPhoto && <Alerts message={errorMessage} position={'fixed'} type={'error'} />)}
      <Dialog className={s.modal} isSimple onClose={exitModal.setTrue} open={openModal.value}>
        {isLoading ||
          (isLoadingForPhoto && (
            <div className={s.loading}>
              <Loader />
            </div>
          ))}

        <div className={s.header}>
          <Button className={s.buttonBack} onClick={handleBackClick} variant={'transparent'}>
            <ArrowIosBackOutline color={'white'} />
          </Button>
          <Title asChild>
            <Typography as={'h1'} option={'h1'}>
              {'Publication'}
            </Typography>
          </Title>
          <Button onClick={onClickPublishHandler} variant={'transparent'}>
            {'Publish'}
          </Button>
        </div>

        <div className={s.contentModal}>
          <div className={s.photoBox}>
            {photos.length > 1 ? (
              <Carousel
                list={photos}
                renderItem={photo => <img alt={'photo'} className={s.photoImg} src={photo} />}
                size={'small'}
              />
            ) : (
              <img alt={'photo'} className={s.photoImg} src={photos[0]} />
            )}
          </div>
          <div className={s.descriptionBox}>
            <div className={s.publicationBox}>
              <UserAvatarName
                url={userProfile?.avatars[0]?.url || ''}
                username={`${userProfile?.userName}`}
              />
              <TextArea
                className={s.addPublication}
                label={'Add publication descriptions'}
                maxLength={500}
                onChange={onChangeValue}
                ref={textareaRef}
                value={value}
              />
            </div>
            <div className={s.locationBox}>
              <div className={s.inputContainer}>
                <Input className={s.addLocation} label={'Add location'} />
                <PinIcon className={s.pinIcon} />
              </div>

              <div className={s.selectedLocation}>
                <Typography className={s.city} option={'regular_text16'}>
                  {'New York'}
                </Typography>
                <Typography className={s.location} option={'small_text'}>
                  {'Washington Square Park'}
                </Typography>
              </div>
              <div className={s.selectedLocation}>
                <Typography className={s.city} option={'regular_text16'}>
                  {'New York'}
                </Typography>
                <Typography className={s.location} option={'small_text'}>
                  {'Washington Square Park'}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <ExitModal
        onCloseModal={exitModal.setFalse}
        onCloseParentModal={() => dispatch(setIsModalOpen({ isOpen: false }))}
        onSaveDraft={() => {}}
        open={exitModal.value}
      />
    </>
  )
}
