'use client'

import { useRef, useState } from 'react'

import { CustomerError } from '@/src/entities/errors/types'
import { RequestPostsType } from '@/src/entities/post/types'
import { FilteringPhoto } from '@/src/features/filteringPhoto/FilteringPhoto'
import { urlToFile } from '@/src/features/publishPhoto/hooks/uploadPhoto'
import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import { useBoolean } from '@/src/shared/hooks/useBoolean'
import { AppRoutes } from '@/src/shared/lib/constants/routing'
import { usePostFlow } from '@/src/shared/lib/context/PostFlowContext'
import {
  postsApi,
  useCreateImageForPostMutation,
  useCreateNewPostMutation,
} from '@/src/shared/model/api/postsApi'
import { useGetMyProfileQuery } from '@/src/shared/model/api/usersApi'
import { setIsPostModalOpen } from '@/src/shared/model/slices/modalSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { Button } from '@/src/shared/ui/button/Button'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { ExitModal } from '@/src/widgets/exitModal/ExitModal'
import { Title } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'

import s from './publishPhoto.module.scss'

type Props = {
  photos: string[]
}

export const PublishPhoto = ({ photos }: Props) => {
  const { data: userProfile } = useGetMyProfileQuery()
  const openModal = useBoolean(true)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const exitModal = useBoolean()
  const showFilteringPhoto = useBoolean()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [addPhotosForPost, { isError: isErrorForPhoto, isLoading: isLoadingForPhoto }] =
    useCreateImageForPostMutation()
  const [addPost, { isError, isLoading }] = useCreateNewPostMutation()
  const [hasTextAreaError, setHasTextAreaError] = useState<string | undefined>('')
  const { discardDraft, saveDraft } = usePostFlow()

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
          userId: Number(userProfile?.id) ?? 0,
        }

        await addPost(publishData).unwrap()
        openModal.setFalse()
        dispatch(setIsPostModalOpen({ isOpen: false }))
        dispatch(
          postsApi.util.updateQueryData('getPosts', { userId: Number(userProfile?.id) }, draft => {
            draft.items = []
          })
        )
        router.push(`${AppRoutes.PROFILE}/${userProfile?.id}`)
        discardDraft()
      } else {
        console.warn('No files were uploaded successfully.')
      }
    } catch (error) {
      const err = error as CustomerError
      const errorMessage = err.data?.messages?.[0]

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
  const handleTextAreaError = (hasError: string | undefined) => {
    setHasTextAreaError(hasError)
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
          <Button
            disabled={!!hasTextAreaError || isLoading || isLoadingForPhoto}
            onClick={onClickPublishHandler}
            variant={'transparent'}
          >
            {isLoading || isLoadingForPhoto ? 'Publishing...' : 'Publish'}
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
                url={userProfile?.avatars?.[0]?.url || ''}
                username={`${userProfile?.userName}`}
              />
              <TextAreaWithValidation
                className={s.addPublication}
                label={'Add publication descriptions'}
                maxLength={500}
                onErrorChange={handleTextAreaError}
                onTextChange={onChangeValue}
                ref={textareaRef}
                value={value}
              />
            </div>
          </div>
        </div>
      </Dialog>
      <ExitModal
        modalType={'post'}
        onCloseModal={exitModal.setFalse}
        onCloseParentModal={() => dispatch(setIsPostModalOpen({ isOpen: false }))}
        onDiscard={discardDraft}
        onSaveDraft={saveDraft}
        open={exitModal.value}
      />
    </>
  )
}
