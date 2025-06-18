import { ERROR_MESSAGES } from '@/src/shared/lib/constants/error-messages'
import { EMAIL_REGEX } from '@/src/shared/lib/constants/regex'
import { z } from 'zod'

export const schema = z.object({
  email: z
    .string()
    .min(1, ERROR_MESSAGES.EMAIL.REQUIRED)
    .email(ERROR_MESSAGES.EMAIL.INVALID)
    .regex(EMAIL_REGEX, ERROR_MESSAGES.EMAIL.FORMAT),
})

export type FormType = z.infer<typeof schema>
