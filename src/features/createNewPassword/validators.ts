import { ERROR_MESSAGES } from '@/src/shared/lib/constants/error-messages'
import { PASSWORD_REGEX } from '@/src/shared/lib/constants/regex'
import { z } from 'zod'

export const schema = z
  .object({
    newPassword: z
      .string()
      .nonempty(ERROR_MESSAGES.PASSWORD.REQUIRED)
      .min(6, ERROR_MESSAGES.PASSWORD.MIN)
      .max(20, ERROR_MESSAGES.PASSWORD.MAX)
      .regex(new RegExp(PASSWORD_REGEX), ERROR_MESSAGES.PASSWORD.FORMAT),
    passwordConfirmation: z.string().nonempty(ERROR_MESSAGES.PASSWORD.CONFIRM),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERROR_MESSAGES.PASSWORD.MISMATCH,
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

export type FormType = z.infer<typeof schema>
