import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { PATHS } from '../../paths'
import useLogin from '../../api/login'
import { LoginSchema } from '../../features/userValidation'
import userProfileStore from '../../store/userProfileStore'
import { Button } from '../'
import CredentialInput from '../EditProfile/CredentialInput'

interface LoginFormProps {}

type FormData = z.infer<typeof LoginSchema>

const defaultValues: FormData = {
  email: '',
  password: '',
}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(LoginSchema),
  })

  const setUserProfile = userProfileStore((state) => state.setUserProfile)

  const navigate = useNavigate()

  const { mutate: login, status } = useLogin()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    login(data, {
      onSuccess: (response) => {
        setUserProfile({
          userInfo: { ...response },
          isLoggedIn: true,
          isError: false,
          isLoading: false,
        })
        reset()
        navigate(PATHS.HOME)
      },
      onError: (error) => {
        console.error('Login error:', error)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-register-form">
      <section className="auth-register-form-section">
        <CredentialInput
          name="email"
          placeholder="Електронна пошта"
          register={register}
          error={errors.email}
          type="email"
        />
      </section>
      <section className="auth-register-form-section">
        <CredentialInput
          name="password"
          placeholder="Пароль"
          register={register}
          error={errors.password}
          type="password"
        />
      </section>

      <section className="auth-register-form-section">
        <Link to={PATHS.PASSWORD.forgot} className="mb-6 mt-6 self-start underline">
          Забули пароль?
        </Link>
      </section>

      {/* Кнопка для відправки форми */}
      <Button
        disabled={status === 'pending'}
        type="submit"
        text="Увійти в акаунт"
        className="py-2 disabled:bg-secondary-brown-900"
      />

      <p className="flex justify-between text-b4">
        Немає аккаунту?{' '}
        <Link to={PATHS.AUTH.register} className="ml-2 underline">
          Зареєструватися
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
