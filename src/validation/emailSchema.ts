import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string().email('Невірний формат електронної пошти'),
})

export type EmailFormData = z.infer<typeof emailSchema>
