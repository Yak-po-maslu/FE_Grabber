import { FC } from 'react'

interface BtnProps {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

const Button: FC<BtnProps> = ({
  text,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  return (
    <button onClick={onClick} type={type} className={`button ${className}`} disabled={disabled}>
      {text}
    </button>
  )
}

export default Button
