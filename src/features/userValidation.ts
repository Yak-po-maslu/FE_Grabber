// userSchemas.ts
import { z } from 'zod'

export const baseUserSchema = z.object({
  first_name: z
    .string()
    .nonempty("Ім'я є обов'язковим")
    .regex(/^[^\d!@#$%^&*()_+=<>?/\\]+$/, "Ім'я не має містити цифр чи спецсимволів")
    .min(2, 'Імʼя повинно містити щонайменше 2 літери')
    .max(30, 'Максимум 30 символів'),
  last_name: z
    .string()
    .nonempty("Прізвище є обов'язковим")
    .regex(/^[^\d!@#$%^&*()_+=<>?/\\]+$/, 'Прізвище не має містити цифр чи спецсимволів')
    .min(2, 'Прізвище повинно містити щонайменше 2 літери')
    .max(30, 'Максимум 30 символів'),
  phone_number: z
    .string()
    .nonempty("Номер телефону є обов'язковим")
    .regex(/^\+380\d{9}$/, 'Номер телефону має бути у форматі +380XXXXXXXXX'),
  email: z.string().nonempty("Електронна пошта є обов'язковою").email('Некоректний e-mail'),
})

const passwordValidation = z
  .string()
  .nonempty("Це поле є обов'язковим")
  .regex(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9 \n]).{8,}$/,
    `Пароль має містити:
– мінімум 8 символів
– хоча б одну велику літеру
– хоча б одну цифру
– спеціальний символ (!@#...)`,
  )

export const passwordSchema = z
  .object({
    old_password: z.string().nonempty('Введіть старий пароль'),
    new_password: passwordValidation,
    confirm_password: z.string().nonempty('Підтвердіть пароль'),
  })
  .refine((data) => data.confirm_password === data.new_password, {
    path: ['confirm_password'],
    message: 'Паролі мають збігатися',
  })

export const registerSchema = z
  .object({
    email: z.string().nonempty("Електронна пошта є обов'язковою").email('Некоректний e-mail'),
    password: passwordValidation,
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

export const LoginSchema = z.object({
  email: z.string().email('Невірний формат електронної пошти'),
  password: z.string().min(6, 'Пароль має містити щонайменше 6 символів'),
})

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

export const editProfileSchema = baseUserSchema.extend({
  user_photo: z
    .union([z.string().url(), z.instanceof(File)])
    .optional()
    .refine(
      (file) => !file || typeof file === 'string' || file.size < 5_242_880,
      'Файл має бути менше 5MB',
    )
    .refine(
      (file) =>
        !file || typeof file === 'string' || ['image/jpeg', 'image/png'].includes(file.type),
      'Тільки JPEG/PNG',
    ),
  location: z
    .string()
    .nonempty('Введіть локацію')
    .regex(/^[^\d!@#$%^&*()_+=<>?/\\]+$/, 'Локація не має містити цифр чи спецсимволів'),
})

export const addAdsSchema = z.object({
  title: z
    .string()
    .nonempty('Заголовок є обовʼязковим')
    .max(100, 'Заголовок має містити не більше 100 символів')
    .min(2, 'Заголовок має містити не менше 2 символів'),
  description: z
    .string()
    .nonempty('Опис є обовʼязковим')
    .max(1000, 'Опис має містити не більше 1000 символів')
    .min(2, 'Опис має містити не менше 2 символів'),
  category: z.string(),
  images: z
    .array(
      z
        .union([z.string().url(), z.instanceof(File)])
        .refine(
          (file) => !file || typeof file === 'string' || file.size < 5_000_000,
          'Файл має бути менше 5MB',
        )
        .refine(
          (file) =>
            !file || typeof file === 'string' || ['image/jpeg', 'image/png'].includes(file.type),
          'Тільки JPEG/PNG',
        ),
    )
    .max(5, 'Максимум 5 зображень'),
  price: z
    .string()
    .nonempty('Ціна є обовʼязковою')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, 'Ціна має бути числом більше за 0'),
})

export const subscribeSchema = baseUserSchema.pick({
  first_name: true,
  email: true,
})
