export type PasswordRecoveryType = {
  baseUrl: string
  email: string
  recaptcha: string
}
export type CreateNewPasswordRecoveryType = {
  newPassword: string
  recoveryCode: string
}
export type RecoveryCodeType = {
  recoveryCode: string
}

export type RecoveryCodeResponse = {
  email: string
}
export type RegistrationType = {
  baseUrl: string
  email: string
  password: string
  userName: string
}

export type OAuthTokenResponse = {
  accessToken: string
  email: string
}

export type ArgsPostGoogleOAuth = {
  code: string
  redirectUrl: string
}
export type RegistrationEmailResending = {
  baseUrl: string
  email: string
}

export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}
