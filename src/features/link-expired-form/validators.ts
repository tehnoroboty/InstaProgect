import { EMAIL_REGEX } from '@/src/constants/regex'
import { z } from 'zod'

export const schema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(EMAIL_REGEX, 'The email must match the format example@example.com'),
})

export type FormType = z.infer<typeof schema>
