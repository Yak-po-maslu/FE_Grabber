import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPassword } from '../../api/resetPassword'
import { useApiRequest } from '../../hooks/useApiRequest.ts'
import { useParams } from 'react-router-dom'
import Button from '../Button/Button'
import { resetPasswordSchema, ResetPasswordFormData } from '../../validation/resetPasswordSchema'

const defaultValues: ResetPasswordFormData = {
  password: '',
  confirmPassword: '',
}

const ResetPasswordForm = () => {
  const { token, uid } = useParams<{ token: string; uid: string }>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    defaultValues,
    resolver: zodResolver(resetPasswordSchema),
  })

  const { error, loading, execute } = useApiRequest()

  const onSubmit: SubmitHandler<ResetPasswordFormData> = (data) => {
    if (!token || !uid) {
      console.log('Токен або UID відсутній')

      return
    }

    execute(() =>
      resetPassword({
        password: data.password,
        uid,
        token,
      }),
    ).then(() => reset())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-[400px]">
      <div className="flex flex-col gap-4 p-5">
        <h1 className="text-center text-title">Відновлення паролю</h1>
        <div className="mb-8 flex flex-col gap-4">
          <input
            type="password"
            id="reset-password"
            className="input-text"
            placeholder="Пароль"
            {...register('password')}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          <input
            type="password"
            id="reset-confirm-password"
            className="input-text"
            placeholder="Підтвердження паролю"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button text={loading ? 'Надсилаємо...' : 'Відправити'} type="submit" disabled={loading} />
      </div>
    </form>
  )
}

export default ResetPasswordForm
