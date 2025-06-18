import { ERROR_MESSAGES } from '@/src/shared/lib/constants/error-messages'
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '@/src/shared/lib/constants/regex'
import { z } from 'zod'

export const schema = z
  .object({
    checkbox: z.boolean(),
    email: z
      .string()
      .min(1, ERROR_MESSAGES.EMAIL.REQUIRED)
      .email(ERROR_MESSAGES.EMAIL.INVALID)
      .regex(EMAIL_REGEX, ERROR_MESSAGES.EMAIL.FORMAT),
    password: z
      .string()
      .nonempty(ERROR_MESSAGES.PASSWORD.REQUIRED)
      .min(6, ERROR_MESSAGES.PASSWORD.MIN)
      .max(20, ERROR_MESSAGES.PASSWORD.MAX)
      .regex(new RegExp(PASSWORD_REGEX), ERROR_MESSAGES.PASSWORD.FORMAT),
    passwordConfirmation: z.string().nonempty(ERROR_MESSAGES.PASSWORD.CONFIRM),
    userName: z
      .string()
      .nonempty(ERROR_MESSAGES.USER_NAME.REQUIRED)
      .min(6, ERROR_MESSAGES.USER_NAME.MIN)
      .max(30, ERROR_MESSAGES.USER_NAME.MAX)
      .regex(USERNAME_REGEX, ERROR_MESSAGES.USER_NAME.FORMAT),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERROR_MESSAGES.PASSWORD.MISMATCH,
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

export type FormType = z.infer<typeof schema>
