import React from 'react'
import { passwordRequirements } from '../../constants'

interface PasswordRequirementsProps {}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({}) => {
  return (
    <ul className="flex list-inside list-disc flex-col gap-0 self-start text-d1">
      <p className="mb-4">Пароль має містити:</p>
      {passwordRequirements.map((requirement, index) => (
        <li className="ml-2 pl-2" key={index}>
          {requirement}
        </li>
      ))}
    </ul>
  )
}

export default PasswordRequirements
