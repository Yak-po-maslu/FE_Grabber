import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import useFetchChangePassword from '../../api/useFetchChangePassword'
import { TChangePassword } from '../../types/authTypes'
import { passwordSchema } from '../../features/userValidation'
import { PATHS } from '../../paths'
import { CredentialInput, Button } from '../../components'

const EditPasswordForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<TChangePassword>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  })

  const { mutate: fetchSubmitData, isSuccess } = useFetchChangePassword()

  const onSubmit = () => {
    const { old_password, new_password } = getValues()
    fetchSubmitData({ old_password, new_password })
  }

  return (
    <form className="auth-register-form m-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex flex-col">
        <CredentialInput
          register={register}
          name="old_password"
          placeholder="Старий пароль"
          error={errors?.old_password}
          type="password"
        />
      </div>

      <div className="relative flex flex-col">
        <CredentialInput
          register={register}
          name="new_password"
          placeholder="Новий пароль"
          error={errors.new_password}
          type="password"
        />
      </div>

      <div className="self-start text-d1 text-grey-600">
        <p className="">Пароль має містити:</p>
        <br />
        <ul className="ml-2 list-inside list-disc">
          <li>мінімум 8 символів</li>
          <li>хоча б 1 велику літеру</li>
          <li>хоча б 1 цифру</li>
          <li>хоча б 1 спеціальний символ (!@#^*$%?_&gt;)</li>
        </ul>
      </div>

      <div className="relative flex flex-col">
        <CredentialInput
          register={register}
          name="confirm_password"
          placeholder="Повторно введіть новий пароль"
          type="password"
          error={errors.confirm_password}
        />
      </div>

      <div className="flex justify-end">
        <Link className="m-auto ml-0" to={PATHS.PROFILE.profile}>
          <p className="ml-2 flex-1 text-grey-500 underline">Відмінити зміни</p>
        </Link>
        <Button
          type="submit"
          disabled={!isDirty || !isValid || isSuccess}
          className="custom-button w-profile-button"
        >
          Зберегти зміни
        </Button>
      </div>
    </form>
  )
}

export default EditPasswordForm
