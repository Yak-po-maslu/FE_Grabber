import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { PATHS } from '../../paths'
import { LoginSchema } from '../../features/userValidation'
import useForgotPassword from '../../api/forgotPassword'
import { Button, CredentialInput, CustomToaster } from '../../components'

const emailSchema = LoginSchema.pick({ email: true })
type EmailFormData = z.infer<typeof emailSchema>

const defaultValues: EmailFormData = {
  email: '',
}

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    defaultValues,
    resolver: zodResolver(emailSchema),
  })

  const navigate = useNavigate()
  const { mutate: sendResetEmail, status } = useForgotPassword()

  const onSubmit: SubmitHandler<EmailFormData> = (data) => {
    sendResetEmail(data, {
      onSuccess: () => {
        reset()
        toast.success(
          'Якщо ви вказали дійсну пошту, на неї було відправлено повідомлення для відновлення паролю.',
          { id: 'reset-password-success', duration: 3000 },
        )
        setTimeout(() => {
          navigate(PATHS.HOME)
        }, 3000)
      },
      onError: (error) => {
        toast.error('Помилка при відправці')
        console.error('Forgot password error:', error)
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="auth-register-form md-[] my-[220px] w-full max-w-[400px]"
    >
      <div className="flex flex-col">
        <h2 className="pb-4 text-center text-h3 text-grey-950">Забули пароль?</h2>
        <p className="pb-8 text-center text-b3 text-grey-950">
          Введіть свій e-mail, з яким ви реєструвалися, і ми надішлемо вам інструкції відновлення
          паролю.
        </p>
        <div className="flex flex-col gap-[58px]">
          <CredentialInput
            register={register}
            name="email"
            placeholder="Введіть ваш e-mail"
            type="email"
            error={errors.email}
            className="input-text"
          />
          <Button
            text="Відправити"
            type="submit"
            disabled={status === 'pending'}
            className="button h-[40px] py-0"
          />
        </div>
      </div>
      <CustomToaster />
    </form>
  )
}

export default ForgotPasswordForm
