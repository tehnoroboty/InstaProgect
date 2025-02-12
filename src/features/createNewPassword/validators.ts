import { ERROR_MESSAGES } from '@/src/constants/error-messages'
import { PASSWORD_REGEX } from '@/src/constants/regex'
import { z } from 'zod'

export const schema = z
  .object({
    newPassword: z
      .string()
      .nonempty(ERROR_MESSAGES.PASSWORD_REQUIRED)
      .min(6, ERROR_MESSAGES.PASSWORD_MIN)
      .max(20, ERROR_MESSAGES.PASSWORD_MAX)
      .regex(new RegExp(PASSWORD_REGEX), ERROR_MESSAGES.PASSWORD_FORMAT),
    passwordConfirmation: z.string().nonempty(ERROR_MESSAGES.PASSWORD_CONFIRM),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERROR_MESSAGES.PASSWORD_MISMATCH,
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

export type FormType = z.infer<typeof schema>
