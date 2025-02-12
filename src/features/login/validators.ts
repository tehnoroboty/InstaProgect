import { ERROR_MESSAGES } from '@/src/constants/error-messages'
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/src/constants/regex'
import { z } from 'zod'

export const schema = z.object({
  email: z
    .string()
    .nonempty(ERROR_MESSAGES.EMAIL_REQUIRED)
    .min(1, ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(ERROR_MESSAGES.EMAIL_INVALID)
    .trim()
    .regex(EMAIL_REGEX, ERROR_MESSAGES.EMAIL_FORMAT),

  password: z
    .string()
    .nonempty(ERROR_MESSAGES.PASSWORD_REQUIRED)
    .min(6, ERROR_MESSAGES.PASSWORD_MIN)
    .max(20, ERROR_MESSAGES.PASSWORD_MAX)
    .trim()
    .regex(new RegExp(PASSWORD_REGEX), ERROR_MESSAGES.PASSWORD_FORMAT),
})

export type FormType = z.infer<typeof schema>
