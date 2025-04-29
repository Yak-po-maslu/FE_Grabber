import { z } from 'zod'

export const registerSchema = z
  .object({
    first_name: z.string().nonempty("Ім'я є обов'язковим"),
    last_name: z.string().nonempty("Прізвище є обов'язковим"),
    phone_number: z
      .string()
      .nonempty("Номер телефону є обов'язковим")
      .regex(/^\+380\d{9}$/, 'Номер телефону має бути у форматі +380XXXXXXXXX'),
    email: z
      .string()
      .nonempty("Електронна пошта є обов'язковою")
      .email('Некоректна електронна пошта'),
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

export type RegisterFormData = z.infer<typeof registerSchema>
