import React from 'react'
import { SearchPanelFrame } from './SearchPanelFrame'
import SerchIcon from '../../assets/icons/sarch-icon.svg?react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { searchSchema } from '../../features/filtersValidation'
import { SearchRegionInput } from '..'

interface SearchPanelProps {}

export type TFormData = z.infer<typeof searchSchema>

const defaultValues: TFormData = {
  locationValue: '',
  searchValue: '',
}

const SearchPanel: React.FC<SearchPanelProps> = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<TFormData>({
    defaultValues,
    resolver: zodResolver(searchSchema),
    mode: 'onChange',
  })

  const handleSubmitForm = (data: TFormData) => {
    console.log(data)
    reset()
  }

  return (
    <SearchPanelFrame repeatX={20} repeatY={1} height={21}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex items-center justify-between gap-8 px-[86px] py-8"
      >
        <div className="relative flex w-[44%]">
          <SerchIcon className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-primary-950" />

          <input
            type="text"
            className={`w-full rounded-[30px] bg-secondary-brown-50 py-3 pl-14 pr-4 text-b4 text-grey-950 placeholder:text-grey-400 hover:bg-secondary-brown-100 focus:outline-none`}
            placeholder="Назва товару"
            {...register('searchValue')}
          />
        </div>

        <SearchRegionInput
          register={register}
          setValue={setValue}
          watch={watch}
          name="locationValue"
        />

        <button
          type="submit"
          className="w-[22%] rounded-[30px] bg-secondary-brown-50 px-4 py-3 text-b4 text-primary-950 hover:bg-secondary-brown-100"
        >
          Шукати
        </button>
      </form>
    </SearchPanelFrame>
  )
}

export default SearchPanel
