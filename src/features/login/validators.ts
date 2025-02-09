import { z } from 'zod'

export const schema = z.object({
  email: z
    .string()
    .nonempty('Enter email')
    .min(1, 'Email is required')
    .email('Invalid email address')
    .trim()
    .regex(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'The email must match the format example@example.com'
    ),

  password: z
    .string()
    .nonempty('Enter password')
    .min(6, 'Min 6 characters long')
    .max(20, 'Max 20 characters long')
    .trim()
    .regex(
      new RegExp(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/
      ),
      'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character.'
    ),
})

export type FormType = z.infer<typeof schema>
