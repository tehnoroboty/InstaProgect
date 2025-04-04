import { ERROR_MESSAGES } from '@/src/shared/lib/constants/error-messages'
import { NAME_REGEX, USERNAME_REGEX } from '@/src/shared/lib/constants/regex'
import { z } from 'zod'

export const schema = z.object({
  aboutMe: z.string().max(200, ERROR_MESSAGES.ABOUT_ME.MAX),
  city: z.string().optional(),
  country: z.string().optional(),
  dateOfBirth: z.string().optional(),
  firstName: z
    .string()
    .nonempty(ERROR_MESSAGES.FIRST_NAME.REQUIRED)
    .min(1, ERROR_MESSAGES.FIRST_NAME.MIN)
    .max(50, ERROR_MESSAGES.FIRST_NAME.MAX)
    .regex(NAME_REGEX, ERROR_MESSAGES.FIRST_NAME.FORMAT),
  lastName: z
    .string()
    .nonempty(ERROR_MESSAGES.FIRST_NAME.REQUIRED)
    .min(1, ERROR_MESSAGES.FIRST_NAME.MIN)
    .max(50, ERROR_MESSAGES.FIRST_NAME.MAX)
    .regex(NAME_REGEX, ERROR_MESSAGES.FIRST_NAME.FORMAT),
  userName: z
    .string()
    .nonempty(ERROR_MESSAGES.USER_NAME.REQUIRED)
    .min(6, ERROR_MESSAGES.USER_NAME.MIN)
    .max(30, ERROR_MESSAGES.USER_NAME.MAX)
    .regex(USERNAME_REGEX, ERROR_MESSAGES.USER_NAME.FORMAT),
})

export type FormType = z.infer<typeof schema>
