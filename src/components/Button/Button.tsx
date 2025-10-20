import React, { FC } from 'react'

interface BtnProps {
  text?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

const Button: FC<BtnProps> = ({
  text,
  onClick,
  type = 'button',
  children,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`button transition duration-300 hover:cursor-pointer ${className}`}
      disabled={disabled}
    >
      {children || text}
    </button>
  )
}

export default Button
