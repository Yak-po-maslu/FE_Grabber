import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Пароль є обов'язковим")
      .min(6, 'Пароль має містити щонайменше 6 символів'),
    confirmPassword: z.string().nonempty("Підтвердження паролю є обов'язковим"),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Паролі не збігаються',
      })
    }
  })

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
