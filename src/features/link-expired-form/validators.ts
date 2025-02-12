import { ERROR_MESSAGES } from '@/src/constants/error-messages'
import { EMAIL_REGEX } from '@/src/constants/regex'
import { z } from 'zod'

export const schema = z.object({
  email: z
    .string()
    .min(1, ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(ERROR_MESSAGES.EMAIL_INVALID)
    .regex(EMAIL_REGEX, ERROR_MESSAGES.EMAIL_FORMAT),
})

export type FormType = z.infer<typeof schema>
