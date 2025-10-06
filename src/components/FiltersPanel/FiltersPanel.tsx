import React from 'react'
import Select from './Select'
import { useForm } from 'react-hook-form'
import useFetchFiltersAndSort from '../../api/useFetchFiltersAndSort'
import FilterIcon from '../../assets/icons/filter_icon.svg?react'
import Ornament_1 from '../../assets/images/Ornament_1_filters_panel.svg?react'
import Ornament_2 from '../../assets/images/Ornament_2_filters_panel.svg?react'

interface FiltersPanelProps {
  categoryId: string
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ categoryId }) => {
  const { register, setValue, watch } = useForm()
  const { data, isSuccess } = useFetchFiltersAndSort(categoryId)

  return (
    <div>
      <div className="flex items-center gap-2">
        <FilterIcon className="text-primary-950" />
        <h2 className="text-b2">Всі фільтри</h2>
      </div>
      {isSuccess ? (
        <>
          <section className="flex h-fit w-full items-center justify-between gap-14">
            <div className="z-10 flex h-full w-full -translate-y-4 items-end justify-between gap-4 pt-8">
              {data && data.base_filters.location && (
                <Select
                  title="Призначення"
                  name="purpose"
                  valuesArr={['Україна', 'Польща', 'Німеччина', 'Італія', 'Франція', 'Іспанія']}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              )}
              {data && data.base_filters.location && (
                <Select
                  title="Колір"
                  name="color"
                  valuesArr={['Україна', 'Польща', 'Німеччина', 'Італія', 'Франція', 'Іспанія']}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              )}
              {data && data.base_filters.location && (
                <Select
                  title="Наявність"
                  name="availability"
                  valuesArr={['Україна', 'Польща', 'Німеччина', 'Італія', 'Франція', 'Іспанія']}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              )}
              {data && data.base_filters.price && (
                <div className="flex items-end justify-between gap-4">
                  <Select
                    title="Ціна"
                    name="price_from"
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    placeHolder="Від"
                    className="rounded-r-none"
                    inputType="number"
                    minValue={data.base_filters.price.min.toString()}
                    maxValue={data.base_filters.price.max.toString()}
                  />
                  <Select
                    name="price_to"
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    className="rounded-l-none"
                    placeHolder="До"
                    inputType="number"
                    maxValue={data.base_filters.price.max.toString()}
                    minValue={data.base_filters.price.min.toString()}
                  />
                </div>
              )}
            </div>
            <div className="flex max-h-[122px] items-center justify-center gap-1 text-primary-950">
              <Ornament_1 />
              <Ornament_2 />
            </div>
          </section>
          <div className="mt-5 flex w-full justify-between">
            {data && data.base_filters.location && (
              <Select
                title="Спосіб доставки"
                name="delivery_method"
                valuesArr={['Україна', 'Польща', 'Німеччина', 'Італія', 'Франція', 'Іспанія']}
                register={register}
                setValue={setValue}
                watch={watch}
                className="w-[226px]"
              />
            )}
            {data && data.base_filters.location && (
              <Select
                title="Сортування"
                name="sort"
                valuesArr={['Україна', 'Польща', 'Німеччина', 'Італія', 'Франція', 'Іспанія']}
                register={register}
                setValue={setValue}
                watch={watch}
                className="w-[226px]"
              />
            )}
          </div>
        </>
      ) : (
        <p>Завантаження фільтрів</p>
      )}
    </div>
  )
}

export default FiltersPanel
