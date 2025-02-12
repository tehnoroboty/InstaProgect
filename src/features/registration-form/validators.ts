import { ERROR_MESSAGES } from '@/src/constants/error-messages'
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '@/src/constants/regex'
import { z } from 'zod'

export const schema = z
  .object({
    checkbox: z.boolean(),
    email: z
      .string()
      .min(1, ERROR_MESSAGES.EMAIL_REQUIRED)
      .email(ERROR_MESSAGES.EMAIL_INVALID)
      .regex(EMAIL_REGEX, ERROR_MESSAGES.EMAIL_FORMAT),
    password: z
      .string()
      .nonempty(ERROR_MESSAGES.PASSWORD_REQUIRED)
      .min(6, ERROR_MESSAGES.PASSWORD_MIN)
      .max(20, ERROR_MESSAGES.PASSWORD_MAX)
      .regex(new RegExp(PASSWORD_REGEX), ERROR_MESSAGES.PASSWORD_FORMAT),
    passwordConfirmation: z.string().nonempty(ERROR_MESSAGES.PASSWORD_CONFIRM),
    userName: z
      .string()
      .nonempty(ERROR_MESSAGES.USERNAME_REQUIRED)
      .min(6, ERROR_MESSAGES.USERNAME_MIN)
      .max(30, ERROR_MESSAGES.USERNAME_MAX)
      .regex(USERNAME_REGEX, ERROR_MESSAGES.USERNAME_FORMAT),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERROR_MESSAGES.PASSWORD_MISMATCH,
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

export type FormType = z.infer<typeof schema>
