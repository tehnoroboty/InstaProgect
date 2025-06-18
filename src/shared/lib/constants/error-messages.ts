export const ERROR_MESSAGES = {
  ABOUT_ME: {
    MAX: 'Max 200 characters long',
  },
  EMAIL: {
    FORMAT: 'The email must match the format example@example.com',
    INVALID: 'Invalid email address',
    REQUIRED: 'Email is required',
  },
  FIRST_NAME: {
    FORMAT: 'Invalid name',
    MAX: 'Max 50 characters long',
    MIN: 'Min 1 characters long',
    REQUIRED: 'Enter name',
  },
  PASSWORD: {
    CONFIRM: 'Confirm your password',
    FORMAT:
      'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character.',
    MAX: 'Max 20 characters long',
    MIN: 'Min 6 characters long',
    MISMATCH: 'Passwords do not match',
    REQUIRED: 'Enter password',
  },
  RECAPTCHA_VERIFY: 'Please verify that you are not a robot',
  USER_NAME: {
    FORMAT: 'Invalid username',
    MAX: 'Max 30 characters long',
    MIN: 'Min 6 characters long',
    REQUIRED: 'Enter username',
  },
} as const
