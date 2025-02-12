import { ERROR_MESSAGES } from '@/src/constants/error-messages'
import { EMAIL_REGEX } from '@/src/constants/regex'
import { z } from 'zod'

export const schema = z.object({
  email: z
    .string()
    .min(1, ERROR_MESSAGES.PASSWORD.REQUIRED)
    .email(ERROR_MESSAGES.EMAIL.INVALID)
    .regex(EMAIL_REGEX, ERROR_MESSAGES.USER_NAME.FORMAT),
  recaptcha: z.string().min(1, ERROR_MESSAGES.RECAPTCHA_VERIFY),
})

export type FormType = z.infer<typeof schema>
