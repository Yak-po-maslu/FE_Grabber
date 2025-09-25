import React from 'react'

interface LoginRegisterProps {
  children?: React.ReactNode
  title: string
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <h1 className="mb-7 text-center text-3xl font-medium text-grey-950">{title}</h1>
      {children}
    </div>
  )
}

export default LoginRegister
