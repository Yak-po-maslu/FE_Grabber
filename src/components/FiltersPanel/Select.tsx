import React, { useEffect, useState } from 'react'
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'

interface SelectProps {
  name: string
  title?: string
  valuesArr?: string[]
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  className?: string
  placeHolder?: string
  inputType?: 'text' | 'number'
  maxValue?: string
  minValue?: string
}

const Select: React.FC<SelectProps> = ({
  title = '',
  name,
  valuesArr,
  register,
  setValue,
  watch,
  className,
  placeHolder = 'Оберіть значення',
  inputType = 'text',
  maxValue,
  minValue,
}: SelectProps) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (newValue: string) => {
    setQuery(newValue)
    setIsOpen(false)
    setValue(name, newValue)
  }

  const currentValue = watch(name)

  // Синхронізація query з формою
  useEffect(() => {
    if (currentValue !== query) {
      setQuery(currentValue || '')
    }
  }, [currentValue, query]) // автоматичне оновлення при reset або зовнішній зміні

  return (
    <div className="flex flex-col justify-start gap-2">
      <h3 className="text-b3">{capitalizeFirstLetter(title)}</h3>
      {inputType === 'text' && (
        <div className="relative">
          <input
            type={inputType}
            {...register(name)}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 150)}
            placeholder={placeHolder}
            className={`input-text appearance-none pr-10 ${className} `}
          />
          {isOpen && (
            <ul className="absolute left-0 top-full z-20 mt-1 max-h-60 w-full overflow-auto rounded-[20px] bg-white text-grey-950 shadow-lg">
              <li
                onMouseDown={() => handleSelect('')}
                className="cursor-pointer px-4 py-2 hover:bg-secondary-brown-100"
              >
                Оберіть значення
              </li>
              {valuesArr && valuesArr.length > 0 ? (
                valuesArr.map((value) => (
                  <li
                    key={value}
                    onMouseDown={() => handleSelect(value)}
                    className="cursor-pointer px-4 py-2 hover:bg-secondary-brown-100"
                  >
                    {value}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-grey-500">Нічого не знайдено</li>
              )}
            </ul>
          )}
        </div>
      )}
      {inputType === 'number' && (
        <input
          type="number"
          {...register(name)}
          value={query !== '' ? query : ''}
          onChange={(e) => {
            const newValue = e.target.value
            setQuery(newValue)
            setValue(name, newValue)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          placeholder={placeHolder}
          className={`input-text max-w-28 appearance-none ${className}`}
          max={maxValue ? Number(maxValue) : undefined}
          min={minValue ? Number(minValue) : undefined}
        />
      )}
    </div>
  )
}

export default Select
