export const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/
export const USERNAME_REGEX = /^[A-Za-z0-9_-]+$/

export const MAX_SIZE_PHOTO = 20 * 1024 * 1024
