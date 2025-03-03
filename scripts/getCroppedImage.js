export const getCroppedImage = async (imageSrc, croppedAreaPixels) => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.src = imageSrc
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Canvas context is not supported'))

        return
      }

      // Устанавливаем размеры canvas в соответствии с обрезанной областью
      canvas.width = croppedAreaPixels.width
      canvas.height = croppedAreaPixels.height

      // Рисуем обрезанное изображение
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      )

      // Преобразуем canvas в base64 (или blob)
      const base64Image = canvas.toDataURL('image/jpeg')

      resolve(base64Image)
    }
    image.onerror = () => {
      reject(new Error('Failed to load image'))
    }
  })
}
