import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from '../../validation/loginSchema'
import { useApiRequest } from '../../hooks/useApiRequest'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../paths'
import { login } from '../../api/login'

interface LoginFormProps {}

const defaultValues: LoginFormData = {
  email: '',
  password: '',
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  })

  const { error, loading, isSuccess, execute } = useApiRequest()

  useEffect(() => {
    if (isSuccess) {
      reset()
    }
  }, [isSuccess, reset])

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    execute(() =>
      login({
        email: data.email.toLowerCase(),
        password: data.password,
      }),
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-register-form">
      <h1 className="mb-7 text-center text-3xl font-medium">Увійти</h1>

      <section className="auth-register-form-section">
        <input
          type="email"
          {...register('email')}
          id="register-email"
          className="input-text"
          placeholder="Електронна пошта"
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </section>

      <section className="auth-register-form-section">
        <input
          type="password"
          {...register('password')}
          id="register-password"
          className="input-text"
          placeholder="Пароль"
        />
        {errors.password && <p className="error-text">{errors.password.message}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </section>

      <section className="auth-register-form-section">
        <Link to="/forgot-password" className="text-xs">
          Забули пароль?
        </Link>
        <Link to={PATHS.AUTH.register} className="text-xs">
          Немає аккаунту? Зареєструватися
        </Link>
      </section>

      <button type="submit" className="button" disabled={loading}>
        Увійти
      </button>
    </form>
  )
}

export default LoginForm
