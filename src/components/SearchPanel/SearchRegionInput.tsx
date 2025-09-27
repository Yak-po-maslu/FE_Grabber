import { useEffect, useState } from 'react'
import LocationIcon from '../../assets/icons/location-icon.svg?react'
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { REGIONS } from '../../constants'

type SearchRegionInputProps = {
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  name: string
}

const SearchRegionInput = ({ register, setValue, watch, name }: SearchRegionInputProps) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filtered = REGIONS.filter((region) => region.toLowerCase().includes(query.toLowerCase()))

  const handleSelect = (region: string) => {
    setQuery(region)
    setValue(name, region)
    setIsOpen(false)
  }

  const currentValue = watch(name)

  // 🔄 Синхронізація query з формою
  useEffect(() => {
    if (currentValue !== query) {
      setQuery(currentValue || '')
    }
  }, [currentValue, query]) // автоматичне оновлення при reset або зовнішній зміні

  return (
    <div className="relative w-[33%]">
      <LocationIcon className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-primary-950" />
      <input
        type="text"
        {...register(name)}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        placeholder="Регіон виготовлення товару"
        className="w-full rounded-[30px] bg-secondary-brown-50 py-3 pl-14 pr-4 text-grey-950 placeholder:text-grey-400 hover:bg-secondary-brown-100 focus:outline-none"
      />
      {isOpen && (
        <ul className="absolute left-0 top-full z-20 mt-1 max-h-60 w-full overflow-auto rounded-[20px] bg-white text-grey-950 shadow-lg">
          {filtered.length > 0 ? (
            filtered.map((region) => (
              <li
                key={region}
                onMouseDown={() => handleSelect(region)}
                className="cursor-pointer px-4 py-2 hover:bg-secondary-brown-100"
              >
                {region}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-grey-500">Нічого не знайдено</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default SearchRegionInput
