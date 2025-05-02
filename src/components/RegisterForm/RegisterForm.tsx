import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PATHS } from '../../paths'
import { Link } from 'react-router-dom'
import { useApiRequest } from '../../hooks/useApiRequest'
import { register as registerUser } from '../../api/register'
import { registerSchema, RegisterFormData } from '../../validation/registerSchema'

const RegisterForm: React.FC = () => {
  // Використання кастомного хука для роботи з API
  const { error, loading, execute } = useApiRequest()
  const {
    register, // Метод для реєстрації полів форми
    handleSubmit, // Метод для обробки відправки форми
    formState: { errors }, // Об'єкт для зберігання помилок валідації
    reset, // Метод для скидання форми
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema), // Підключення схеми валідації
  })

  // Функція для обробки відправки форми
  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    execute(() =>
      registerUser({
        email: data.email.toLowerCase(),
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
      }),
    ) // Виклик функції реєстрації користувача
  }

  // Виклик reset при успішній реєстрації
  useEffect(() => {
    if (!error) {
      reset()
    }
  }, [error, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-register-form">
      <h1 className="mb-7 text-center text-3xl font-medium">Реєстрація</h1>
      {/* Поле для введення імені */}
      <section className="auth-register-form-section">
        <input
          type="text"
          {...register('first_name')}
          id="register-name"
          className="input-text"
          placeholder="Ім'я"
        />
        {errors.first_name && <p className="error-text">{errors.first_name.message}</p>}
      </section>
      {/* Поле для введення прізвища */}
      <section className="auth-register-form-section">
        <input
          type="text"
          {...register('last_name')}
          id="register-surname"
          className="input-text"
          placeholder="Прізвище"
        />
        {errors.last_name && <p className="error-text">{errors.last_name.message}</p>}
      </section>
      {/* Поле для введення номера телефону */}
      <section className="auth-register-form-section">
        <input
          type="text"
          {...register('phone_number')}
          id="register-phone"
          className="input-text"
          placeholder="Номер телефону"
        />
        {errors.phone_number && <p className="error-text">{errors.phone_number.message}</p>}
      </section>
      {/* Поле для введення електронної пошти */}
      <section className="auth-register-form-section">
        <input
          type="email"
          {...register('email')}
          id="register-email"
          className="input-text"
          placeholder="Електронна пошта"
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </section>
      {/* Поле для введення паролю */}
      <section className="auth-register-form-section">
        <input
          type="password"
          {...register('password')}
          id="register-password"
          className="input-text"
          placeholder="Пароль"
        />
        {errors.password && <p className="error-text">{errors.password.message}</p>}
      </section>
      {/* Поле для підтвердження паролю */}
      <section className="auth-register-form-section">
        <input
          type="password"
          {...register('confirmPassword')}
          id="register-confirm-password"
          className="input-text"
          placeholder="Підтвердження паролю"
        />
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
      </section>
      {/* Посилання для переходу на сторінку входу */}
      <section className="auth-register-form-section">
        <Link to={PATHS.AUTH.login} className="text-xs">
          Вже є акаунт? Увійти
        </Link>
      </section>
      {/* Кнопка для відправки форми */}
      <button type="submit" className="button" disabled={loading}>
        Зареєструватися
      </button>
    </form>
  )
}

export default RegisterForm
