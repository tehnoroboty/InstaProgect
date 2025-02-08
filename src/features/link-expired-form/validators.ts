import { z } from 'zod'

export const schema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'The email must match the format example@example.com'
    ),
})

export type FormType = z.infer<typeof schema>
