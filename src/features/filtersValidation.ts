import { z } from 'zod'

export const searchSchema = z.object({
  searchValue: z.string().trim(),
  locationValue: z.string().trim(),
})
