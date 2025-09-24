import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editEmailSchema } from '../../features/userValidation'
import { toast } from 'react-hot-toast'
import { PATHS } from '../../paths'
import fetchChangeEmail from '../../api/useFetchChangeEmail'
import { CustomToaster, Button, CredentialInput } from '../../components'

const EditEmailForm = () => {
  const { mutate: changeEmail, isSuccess } = fetchChangeEmail()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(editEmailSchema),
    mode: 'onChange',
  })

  const onSubmit = () => {
    const allValues = getValues()
    changeEmail(allValues)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('E-mail успішно змінено!', {
        id: 'change-email',
        duration: 3000,
      })
      setTimeout(() => {
        navigate(PATHS.PROFILE.profile)
      }, 3000)
    }
  }, [isSuccess, navigate])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-register-form">
      <CredentialInput
        register={register}
        type="email"
        name="current_email"
        error={errors.current_email}
        placeholder="Введіть поточний e-mail"
      />
      <CredentialInput
        register={register}
        type="email"
        className="mb-4"
        name="new_email"
        error={errors.new_email}
        placeholder="Введіть новий e-mail"
      />
      <CredentialInput
        register={register}
        className="mb-2"
        name="password"
        type="password"
        placeholder="Введіть пароль"
        error={errors.password}
      />
      <Link to={PATHS.PASSWORD.forgot} className="ml-2 text-grey-500 underline">
        Забули пароль?
      </Link>
      <div className="flex gap-10">
        <Link className="m-auto" to={PATHS.PROFILE.profile}>
          <p className="ml-2 text-grey-500 underline">Відмінити зміни</p>
        </Link>
        <Button disabled={!isValid} className="custom-button m-0 w-[203px] flex-1" type="submit">
          Зберегти зміни
        </Button>
      </div>
      <CustomToaster />
    </form>
  )
}

export default EditEmailForm
