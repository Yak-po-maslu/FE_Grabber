import { z } from 'zod'

export const passwordSchema = z.object({
  password: z.string().min(6, 'Пароль має містити щонайменше 6 символів'),
})

export type PasswordFormData = z.infer<typeof passwordSchema>
