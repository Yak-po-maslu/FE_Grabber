import { z } from 'zod'

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
  category_name: z.string().nonempty('Категорія є обовʼязковою'),
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
    .max(4, 'Максимум 4 зображення'),
  price: z
    .string()
    .nonempty('Ціна є обовʼязковою')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, 'Ціна має бути числом більше за 0'),
  location: z.string().nonempty('Локація є обовʼязковою'),
  contact_name: z
    .string()
    .nonempty("Ім'я контактної особи є обов'язковим")
    .regex(/^[^\d!@#$%^&*()_+=<>?/\\]+$/, "Ім'я не має містити цифр чи спецсимволів")
    .min(2, 'Імʼя контактної особи повинно містити щонайменше 2 літери')
    .max(30, 'Максимум  100 символів'),
  email: z
    .string()
    .nonempty("Електронна пошта є обов'язковою")
    .email('Некоректна електронна пошта'),
  phone: z
    .string()
    .nonempty("Номер телефону є обов'язковим")
    .regex(/^\+380\d{9}$/, 'Номер телефону має бути у форматі +380XXXXXXXXX'),
})
