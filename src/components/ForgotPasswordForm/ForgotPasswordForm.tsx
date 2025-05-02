import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPassword } from '../../api/forgotPassword'
import { useApiRequest } from '../../hooks/useApiRequest'
import Button from '../Button/Button'
import { emailSchema, EmailFormData } from '../../validation/emailSchema.ts'

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

  const { error, loading, execute } = useApiRequest()

  const onSubmit: SubmitHandler<EmailFormData> = (data) => {
    execute(() => forgotPassword({ email: data.email.toLowerCase() })).then(() => reset())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-[400px]">
      <div className="flex flex-col p-5">
        <div className="mb-20 flex flex-col gap-4">
          <h1 className="text-center text-title">Відновлення паролю</h1>
          <p>
            Введіть email, з яким ви реєструвалися. Ми надішлемо вам інструкції з відновлення
            паролю.
          </p>
        </div>
        <div className="mb-8 flex flex-col gap-4">
          <label htmlFor="email" className="text-link">
            Куди вам надіслати код?
          </label>
          <input
            type="email"
            id="email"
            className="input-text"
            placeholder="Електронна пошта"
            {...register('email')}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <Button text={loading ? 'Надсилаємо...' : 'Відправити'} type="submit" disabled={loading} />
      </div>
    </form>
  )
}

export default ForgotPasswordForm
