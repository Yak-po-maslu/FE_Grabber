import { useState } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import ErrorIcon from '../../assets/icons/exclamation-icon.svg?react'
import ShowIcon from '../../assets/icons/eye-icon.svg?react'
import CloseIcon from '../../assets/icons/closed-eye-icon.svg?react'

type Props = {
  register: UseFormRegister<any>
  error?: FieldError
  name:
    | 'current_email'
    | 'new_email'
    | 'email'
    | 'password'
    | 'confirm_password'
    | 'new_password'
    | 'old_password'
  placeholder: string
  className?: string
  type?: string
}

const CredentialInput = ({ register, error, name, placeholder, className, type }: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <input
          {...register(name, { required: true })}
          placeholder={placeholder}
          type={inputType}
          className={`input-text autoComplete="new-password" appearance-none pr-10 ${className} ${error ? 'border-error-default' : ''}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`${showPassword ? 'text-secondary-brown-300' : 'text-primary-950'} absolute inset-y-0 right-3 flex items-center`}
          >
            {showPassword ? (
              <CloseIcon className="h-[24px] w-[24px]" />
            ) : (
              <ShowIcon className="h-[24px] w-[24px]" />
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-1 flex items-center gap-2 text-error-default">
          <ErrorIcon className="h-[24px] w-[24px]" />
          <span className="text-d1 text-error-default">{error.message}</span>
        </div>
      )}
    </div>
  )
}

export default CredentialInput
