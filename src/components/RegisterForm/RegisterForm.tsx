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
import PasswordRequirements from '../PasswordRequirements/PasswordRequirements'
import CredentialInput from '../EditProfile/CredentialInput'

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
      {/* Поле для введення електронної пошти */}
      <section className="auth-register-form-section">
        <CredentialInput
          type="email"
          register={register}
          name="email"
          error={errors.email}
          placeholder="Email"
        />
      </section>

      {/* Поле для введення паролю */}
      <section className="auth-register-form-section">
        <CredentialInput
          type="password"
          register={register}
          name="password"
          error={errors.password}
          placeholder="Пароль"
        />
      </section>

      {/* Поле для підтвердження паролю */}
      <section className="auth-register-form-section mb-4">
        <CredentialInput
          name="confirm_password"
          type="password"
          register={register}
          placeholder="Підтвердження паролю"
          error={errors.confirmPassword}
        />
      </section>

      <section className="auth-register-form-section mb-12 mt-6">
        <PasswordRequirements />
      </section>

      {/* Кнопка для відправки форми */}
      <Button
        className="py-2 disabled:bg-secondary-brown-900"
        type="submit"
        disabled={status === 'pending'}
        text="Зареєструватися"
      />

      {/* Посилання для переходу на сторінку входу */}
      <p className="flex justify-center gap-4 text-b4">
        Вже є акаунт?
        <Link to={PATHS.AUTH.login} className="underline">
          Увійти
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm
