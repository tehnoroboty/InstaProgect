import { getCroppedImage } from '@/scripts/getCroppedImage'
import { PhotoSettings } from '@/src/features/croppingPhoto/types'

export const applyCropToAllPhotos = async (
  localPhotos: string[],
  photoSettings: Record<number, PhotoSettings>,
  setLocalPhotos: (data: string[]) => void
) => {
  const updatedPhotos = await Promise.all(
    localPhotos.map(async (photo, index) => {
      const { croppedAreaPixels } = photoSettings[index]

      if (croppedAreaPixels) {
        return await getCroppedImage(photo, croppedAreaPixels)
      }

      return photo
    })
  )

  return setLocalPhotos(updatedPhotos)
}
