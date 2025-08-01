import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PATHS } from '../../paths'
import { Link, useNavigate } from 'react-router-dom'
import { registerSchema } from '../../features/userValidation'
import useRegister from '../../api/register'
import userProfileStore from '../../store/userProfileStore'
import Button from '../Button/Button'

// Тип даних форми, отриманий з схеми
type FormData = z.infer<typeof registerSchema>

const RegisterForm: React.FC = () => {
  const {
    register, // Метод для реєстрації полів форми
    handleSubmit, // Метод для обробки відправки форми
    formState: { errors }, // Об'єкт для зберігання помилок валідації
    reset, // Метод для скидання форми
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema), // Підключення схеми валідації
  })
  const setUserProfile = userProfileStore((state) => state.setUserProfile)
  const navigate = useNavigate()

  const { mutate: registerUser, status } = useRegister()

  // Функція для обробки відправки форми
  const onSubmit: SubmitHandler<FormData> = (data) => {
    registerUser(
      {
        email: data.email.toLowerCase(),
        password: data.password,
      },
      {
        onSuccess: (response) => {
          console.log('Registration successful:', response) // Успішна реєстрація
          setUserProfile({
            userInfo: { ...response },
            isLoggedIn: true,
            isError: false,
            isLoading: false,
          }) // Збереження профілю користувача в стані
          reset() // Скидання форми при успішній реєстрації
          navigate(PATHS.PROFILE.profile)
        },
        onError: (error) => {
          console.error('Registration error:', error) // Обробка помилок
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-register-form">
      <h1 className="mb-7 text-center text-3xl font-medium">Реєстрація</h1>
      {/* Поле для введення електронної пошти */}
      <section className="auth-register-form-section">
        <label className={`w-full ${errors.email ? 'warning-icon-for-input' : ''}`}>
          <input
            type="email"
            {...register('email')}
            id="register-email"
            className={`input-text ${errors.email ? 'border-error-default' : ''}`}
            placeholder="Email"
          />
        </label>
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </section>
      {/* Поле для введення паролю */}
      <section className="auth-register-form-section">
        <label className={`w-full ${errors.password ? 'warning-icon-for-input' : ''}`}>
          <input
            type="password"
            {...register('password')}
            id="register-password"
            className={`input-text ${errors.password ? 'border-error-default' : ''}`}
            placeholder="Пароль"
          />
        </label>
        {errors?.password?.message?.split(`\n`).map((item, index) => (
          <p className="error-text" key={index}>
            {item}
          </p>
        ))}
      </section>
      {/* Поле для підтвердження паролю */}
      <section className="auth-register-form-section mb-4">
        <label className={`w-full ${errors.confirmPassword ? 'warning-icon-for-input' : ''}`}>
          <input
            type="password"
            {...register('confirmPassword')}
            id="register-confirm-password"
            className={`input-text ${errors.confirmPassword ? 'border-error-default' : ''}`}
            placeholder="Підтвердження паролю"
          />
        </label>
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
      </section>
      <section className="auth-register-form-section">
        <ul className="flex list-inside list-disc flex-col gap-0 self-start text-d1 text-grey-600">
          <p className="mb-4">Пароль має містити:</p>
          <li className="ml-2 pl-2">мінімум 8 символів</li>
          <li className="ml-2 pl-2">хоча б одну велику літеру</li>
          <li className="ml-2 pl-2">хоча б одну цифру</li>
          <li className="ml-2 pl-2">хоча б 1 спеціальний символ (!@#^*$%?_&gt;)</li>
        </ul>
      </section>

      {/* Кнопка для відправки форми */}
      <Button
        className="py-2"
        type="submit"
        disabled={status === 'pending'}
        text="Зареєструватися"
      />

      {/* Посилання для переходу на сторінку входу */}
      <section className="auth-register-form-section mb-32">
        <p className="text-b4 text-grey-800">
          Вже є акаунт?
          <Link to={PATHS.AUTH.login} className="ml-2 text-grey-500 underline">
            Увійти
          </Link>
        </p>
      </section>
    </form>
  )
}

export default RegisterForm
