export type PhotoSettings = {
  crop: { x: number; y: number }
  croppedAreaPixels: CroppedAreaPixelsType | null
  size: number
  zoomLevel: number
}

export type CroppedAreaPixelsType = {
  height: number
  width: number
  x: number
  y: number
}

export type CroppedAreaType = {
  height: number
  width: number
  x: number
  y: number
}

export type ModalType = 'photo' | 'post'
