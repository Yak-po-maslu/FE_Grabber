import { useParams, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { PATHS } from '../../paths.ts'
import { resetPasswordSchema } from '../../features/userValidation'
import useResetPassword from '../../api/resetPassword.ts'
import { Button, CredentialInput, CustomToaster } from '../../components'

type ResetFormData = z.infer<typeof resetPasswordSchema>

const defaultValues: ResetFormData = {
  password: '',
  confirm_password: '',
}

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetFormData>({
    defaultValues,
    resolver: zodResolver(resetPasswordSchema),
  })

  const { token, uid } = useParams<{ token: string; uid: string }>()

  const navigate = useNavigate()

  const { mutate: resetPassword, status } = useResetPassword()

  const onSubmit: SubmitHandler<ResetFormData> = (data) => {
    if (!token || !uid) {
      console.log('Токен або UID відсутній')

      return
    }

    resetPassword(
      { password: data.password, uid, token },
      {
        onSuccess: () => {
          reset()
          toast.success('Пароль успішно змінено', { id: 'forgot-password-success', duration: 3000 })
          setTimeout(() => {
            navigate(PATHS.AUTH.login)
          }, 3000)
        },
        onError: (error) => {
          toast.error('Помилка при зміні паролю')
          console.error('Reset password error:', error)
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="auth-register-form mb-[280px] mt-[220px] w-full max-w-[400px] bg-secondary-brown-50"
    >
      <div className="relative flex flex-col">
        <h2 className="pb-8 text-center text-h3 text-grey-950">Відновлення паролю</h2>
        <div className="mb-8 flex flex-col gap-4">
          <CredentialInput
            register={register}
            name="password"
            placeholder="Введіть новий пароль"
            type="password"
            error={errors.password}
            className="input-text bg-transparent"
          />
          <CredentialInput
            register={register}
            name="confirm_password"
            placeholder="Повторно введіть новий пароль"
            type="password"
            error={errors.confirm_password}
            className="input-text bg-transparent"
          />
        </div>
        <Button
          text="Відправити"
          type="submit"
          disabled={status === 'pending'}
          className="button h-[40px] py-0"
        />
      </div>
      <CustomToaster />
    </form>
  )
}

export default ResetPasswordForm
