export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

type UserMetadata = {
  followers: number
  following: number
  publications: number
}

export type Profile = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export type PublicProfileTypes = {
  aboutMe: string
  avatars: Avatar[]
  hasPaymentSubscription: boolean
  id: number
  userMetadata: UserMetadata
  userName: string
}
