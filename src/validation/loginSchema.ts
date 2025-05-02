import { emailSchema } from './emailSchema'
import { passwordSchema } from './passwordSchema'
import { z } from 'zod'

export const loginSchema = emailSchema.merge(passwordSchema)

export type LoginFormData = z.infer<typeof loginSchema>
