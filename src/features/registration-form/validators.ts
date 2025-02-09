import { z } from 'zod'

export const schema = z
  .object({
    checkbox: z.boolean(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address')
      .regex(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        'The email must match the format example@example.com'
      ),
    password: z
      .string()
      .nonempty('Enter password')
      .min(6, 'Min 6 characters long')
      .max(20, 'Max 20 characters long')
      .regex(
        new RegExp(
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/
        ),
        'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character.'
      ),
    passwordConfirmation: z.string().nonempty('Confirm your password'),
    userName: z
      .string()
      .nonempty('Enter username')
      .min(6, 'Min 6 characters long')
      .max(30, 'Max characters long')
      .nonempty('Enter username')
      .regex(/^[A-Za-z0-9_-]+$/, 'Invalid username'),
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
