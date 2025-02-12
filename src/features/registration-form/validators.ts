import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '@/src/constants/regex'
import { z } from 'zod'

export const schema = z
  .object({
    checkbox: z.boolean(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address')
      .regex(EMAIL_REGEX, 'The email must match the format example@example.com'),
    password: z
      .string()
      .nonempty('Enter password')
      .min(6, 'Min 6 characters long')
      .max(20, 'Max 20 characters long')
      .regex(
        new RegExp(PASSWORD_REGEX),
        'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character.'
      ),
    passwordConfirmation: z.string().nonempty('Confirm your password'),
    userName: z
      .string()
      .nonempty('Enter username')
      .min(6, 'Min 6 characters long')
      .max(30, 'Max characters long')
      .nonempty('Enter username')
      .regex(USERNAME_REGEX, 'Invalid username'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

export type FormType = z.infer<typeof schema>
