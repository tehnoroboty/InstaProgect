import { PASSWORD_REGEX } from '@/src/constants/regex'
import { z } from 'zod'

export const schema = z
  .object({
    newPassword: z
      .string()
      .nonempty('Enter password')
      .min(6, 'Min 6 characters long')
      .max(20, 'Max 20 characters long')
      .regex(
        new RegExp(PASSWORD_REGEX),
        'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character.'
      ),
    passwordConfirmation: z.string().nonempty('Confirm your password'),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

export type FormType = z.infer<typeof schema>
