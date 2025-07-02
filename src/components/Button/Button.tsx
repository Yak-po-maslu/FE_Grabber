import { FC } from 'react'

interface BtnProps {
  text?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  isHover?: boolean
}

const Button: FC<BtnProps> = ({
  text,
  onClick,
  type = 'button',
  children,
  className = '',
  disabled = false,
  isHover = true,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`button ${isHover ? 'button-hover' : ''} ${className}`}
      disabled={disabled}
    >
      {children || text}
    </button>
  )
}

export default Button
