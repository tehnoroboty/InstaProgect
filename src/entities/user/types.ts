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
export type ProfileByUserName = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  followersCount: number
  followingCount: number
  isFollowedBy: boolean
  isFollowing: boolean
  publicationsCount: number
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export type ResponseTypeCountys = {
  data: CountrysType[]
  error: boolean
  msg: string
}
export type CountrysType = {
  cities: Array<string>
  country: string
  iso2: string
  iso3: string
}
