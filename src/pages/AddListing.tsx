import { useForm } from 'react-hook-form'
import { addListingSchema } from '../features/listingsValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ListingImageUploader, Button } from '../components'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useFetchCategories from '../api/useFetchCategories'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import useAdsCreate from '../api/adsCreate'
import useFetchSubcategories from '../api/useFetchSubcategories'

export type TFormData = z.infer<typeof addListingSchema>

const defaultValues: TFormData = {
  title: '',
  description: '',
  category_name: '',
  subcategory_name: '',
  images: [],
  price: '0',
  contact_name: '',
  email: '',
  phone: '',
  location: '',
}

const AddListing = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<TFormData>({
    defaultValues,
    resolver: zodResolver(addListingSchema),
    mode: 'onChange',
  })

  const { mutateAsync: createAds, isPending } = useAdsCreate()
  const { data: categories } = useFetchCategories()
  const { data: subcategories } = useFetchSubcategories()
  const navigate = useNavigate()

  const handleSubmitForm = async (data: TFormData) => {
    const newAds = new FormData()

    newAds.append('title', capitalizeFirstLetter(data.title))
    newAds.append('description', capitalizeFirstLetter(data.description))
    newAds.append('price', data.price)
    newAds.append('status', 'draft')
    newAds.append('category', data.category_name)
    newAds.append('subcategory', data.subcategory_name)
    newAds.append('contact_name', capitalizeFirstLetter(data.contact_name))
    newAds.append('email', data.email)
    newAds.append('phone', data.phone)
    newAds.append('location', capitalizeFirstLetter(data.location))

    data.images.forEach((img) => {
      if (img instanceof File) {
        newAds.append('images', img)
      }
    })

    try {
      await createAds(newAds)
      toast.success('Оголошення відправлено на модерацію', { id: 'add_ads', duration: 2000 })
      reset()
    } catch (error) {
      toast.error(`Невідома помилка ${error}`, { id: 'add_ads', duration: 2000 })
    }
  }

  const handleCloseForm = () => {
    reset()
    navigate(-1)
  }

  const watchCategory = watch('category_name')
  const watchSubcategory = watch('subcategory_name')
  const watchTitle = watch('title')
  const watchDescription = watch('description')
  const watchLocation = watch('location')
  const watchImages = watch('images')
  const watchPrice = watch('price')
  const watchContactName = watch('contact_name')
  const watchEmail = watch('email')
  const watchPhone = watch('phone')

  const isFormValid = Boolean(
    watchImages.length > 0 &&
      watchCategory &&
      watchSubcategory &&
      watchTitle &&
      watchDescription &&
      watchLocation &&
      (Number(watchPrice) > 0 || watchPrice !== '') &&
      watchContactName &&
      watchEmail &&
      watchPhone &&
      !Object.keys(errors).length,
  )

  const selectedCategory = categories?.find((category) => category.name === watchCategory)

  const filteredSubcategories = subcategories?.filter(
    (subcategory) => subcategory.category === selectedCategory?.id,
  )

  return (
    <div className="mx-auto max-w-container px-4 pt-24">
      <h1 className="mb-12 text-h3 text-grey-950">Створити оголошення</h1>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex max-w-[66%] flex-col gap-12 max-[1100px]:max-w-[80%] max-[900px]:max-w-[100%]"
      >
        {/* Секція для заголовка оголошення */}
        <section>
          <h2 className="title-add-product-section">Заголовок оголошення *</h2>
          <p className="description-add-product-section">Введіть коротку назву товару</p>
          <label className={`w-full ${errors.title ? 'warning-icon-for-input' : ''}`}>
            <input
              {...register('title')}
              type="text"
              maxLength={100}
              placeholder="Приклад: Мед"
              className={`input-add-product-section ${errors.title || watchTitle.length >= 101 ? 'outline-1 outline-error-default' : ''}`}
            />
          </label>
          <div
            className={`flex justify-between text-d1 ${errors.title ? 'text-error-default' : 'text-grey-400'}`}
          >
            <p>Мінімум 3 символи</p>
            <p>{watchTitle.length}/100</p>
          </div>
          {(errors.title || watchTitle.length >= 101) && (
            <p className="error-text">{errors.title?.message}</p>
          )}
        </section>

        {/* Секція для опису товару */}
        <section>
          <h2 className="title-add-product-section">Опис *</h2>
          <p className="description-add-product-section">
            Детально опишіть товар, його особливості
          </p>
          <textarea
            {...register('description')}
            rows={7}
            maxLength={1000}
            placeholder="Приклад: глиняна тарілка з ручним розписом, висотою 18 мм та діаметром 21 см"
            className={`input-add-product-section ${errors.description ? 'outline-1 outline-error-default' : ''}`}
          ></textarea>
          <div
            className={`flex justify-between text-d1 ${errors.title ? 'text-error-default' : 'text-grey-400'}`}
          >
            <p>Мінімум 40 символів</p>
            <p>{watchDescription.length}/1000</p>
          </div>
          {errors.description && <p className="error-text">{errors.description.message}</p>}
        </section>

        {/* Секція для вибору категорії */}
        <section>
          <h2 className="title-add-product-section">Категорія *</h2>

          <div className="flex flex-wrap gap-5">
            {categories &&
              categories.map((category, index) => {
                return (
                  <label
                    className={`text-regular transition-[background-color, color] cursor-pointer rounded-full border border-primary-950 px-4 py-2 text-b4 duration-300 ${
                      watchCategory === category.name
                        ? 'bg-primary-950 text-primary-50'
                        : 'text-primary-950 hover:bg-primary-950 hover:text-primary-50'
                    }`}
                    key={index + category.name}
                  >
                    {category.name}
                    <input
                      type="radio"
                      {...register('category_name')}
                      value={category.name}
                      id={category.name}
                      className="appearance-none"
                    />
                  </label>
                )
              })}
          </div>
          {errors.category_name && <p className="error-text">{errors.category_name.message}</p>}
        </section>

        {/* Секція для вибору підкатегорії */}
        {watchCategory && (
          <section>
            <h2 className="title-add-product-section">Підкатегорія *</h2>

            <div className="flex flex-wrap gap-5">
              {filteredSubcategories && filteredSubcategories.length > 0 ? (
                filteredSubcategories.map((subcategory, index) => {
                  return (
                    <label
                      className={`text-regular transition-[background-color, color] cursor-pointer rounded-full border border-primary-950 px-4 py-2 text-b4 duration-300 ${
                        watchSubcategory === subcategory.name
                          ? 'bg-primary-950 text-primary-50'
                          : 'text-primary-950 hover:bg-primary-950 hover:text-primary-50'
                      }`}
                      key={index + subcategory.name}
                    >
                      {subcategory.name}
                      <input
                        type="radio"
                        {...register('subcategory_name')}
                        value={JSON.stringify(subcategory)}
                        id={subcategory.name}
                        className="appearance-none"
                      />
                    </label>
                  )
                })
              ) : (
                <p>Підкатегорії відсутні</p>
              )}
            </div>
            {errors.subcategory_name && (
              <p className="error-text">{errors.subcategory_name.message}</p>
            )}
          </section>
        )}

        {/* Секція для місця створення товару */}
        <section>
          <h2 className="title-add-product-section">
            Місце створення товару/місце надання сервісу *
          </h2>
          <p className="description-add-product-section">Введіть назву населеного пункту</p>
          <label className={`w-full ${errors.location ? 'warning-icon-for-input' : ''}`}>
            {' '}
            <input
              {...register('location')}
              type="text"
              maxLength={100}
              minLength={2}
              placeholder="Приклад: Полтава"
              className={`input-add-product-section ${errors.location || watchLocation.length >= 101 ? 'outline-1 outline-error-default' : ''}`}
            />
          </label>
          <div
            className={`flex justify-between text-d1 ${errors.title ? 'text-error-default' : 'text-grey-400'}`}
          >
            <p>Мінімум 2 символи</p>
            <p>{watchLocation.length}/100</p>
          </div>
          {(errors.location || watchLocation.length >= 101) && (
            <p className="error-text">{errors.location?.message}</p>
          )}
        </section>

        {/* Секція для завантаження зображень */}
        <section>
          <h2 className="title-add-product-section">Зображення *</h2>
          <p className="description-add-product-section">
            Перетягніть файли або натисніть для завантаження
          </p>
          <ListingImageUploader setValue={setValue} watch={watch} setError={setError} />
          {errors.images && <p className="error-text">{errors.images.message}</p>}
        </section>

        {/* Секція для введення ціни */}
        <section>
          <h2 className="title-add-product-section">Ціна (грн) *</h2>
          <p className="description-add-product-section">
            Введіть цифру без крапок, ком та відступів
          </p>
          <label className={`w-full ${errors.price ? 'warning-icon-for-input' : ''}`}>
            <input
              type="number"
              {...register('price')}
              placeholder="Приклад: 22450"
              className={`input-add-product-section ${
                errors.price ? 'outline-1 outline-error-default' : ''
              }`}
            />
          </label>
          {errors.price && <p className="error-text">{errors.price.message}</p>}
        </section>

        {/* Секція для введення контактних даних */}
        <section>
          <h2 className="title-add-product-section">Контактні данні *</h2>
          {/* Ім'я */}
          <p className="description-add-product-section">Ім’я особи, яка продає товар</p>
          <label className={`w-full ${errors.contact_name ? 'warning-icon-for-input' : ''}`}>
            <input
              {...register('contact_name')}
              type="text"
              maxLength={100}
              placeholder="Вікторія"
              className={`input-add-product-section w-1/2 ${errors.contact_name ? 'outline-1 outline-error-default' : ''}`}
            />
          </label>
          {errors.contact_name && <p className="error-text">{errors.contact_name?.message}</p>}

          {/* Email */}
          <p className="description-add-product-section">Пошта</p>
          <label className={`w-full ${errors.email ? 'warning-icon-for-input' : ''}`}>
            <input
              {...register('email')}
              type="email"
              placeholder="e-mail"
              className={`input-add-product-section w-1/2 ${errors.email ? 'outline-1 outline-error-default' : ''}`}
            />
          </label>
          {errors.email && <p className="error-text">{errors.email?.message}</p>}

          {/* Телефон */}
          <p className="description-add-product-section">Телефон</p>
          <label className={`w-full ${errors.phone ? 'warning-icon-for-input' : ''}`}>
            <input
              {...register('phone')}
              type="text"
              placeholder="+380..."
              className={`input-add-product-section w-1/2 ${errors.phone ? 'outline-1 outline-error-default' : ''}`}
            />
          </label>
          {errors.phone && <p className="error-text">{errors.phone?.message}</p>}
        </section>

        <div className="flex justify-end gap-5">
          <button
            type="button"
            className="text-d1 text-grey-500 underline"
            onClick={handleCloseForm}
          >
            Скасувати
          </button>

          <Button
            className={`relative grid place-items-center ${!isFormValid ? 'bg-secondary-blue-50' : ''} ${isPending ? 'opacity-100' : ''}`}
            disabled={!isFormValid || isPending}
            type="submit"
          >
            <span
              className={` ${isPending ? 'invisible opacity-0' : 'visible opacity-100'} col-start-1 row-start-1`}
            >
              Опублікувати
            </span>
            {/* Спіннер */}
            <div
              className={`animate-spin col-start-1 row-start-1 h-4 w-4 rounded-full border-4 border-gray-300 border-t-primary-950 ${isPending ? 'block' : 'hidden'} `}
            ></div>
          </Button>
        </div>
      </form>

      <Toaster
        position="bottom-center"
        toastOptions={{
          id: 'profile-editor-toasts',
          className:
            '!bg-[#FFFFFF] !text-[1.5rem]  text-[#000000] rounded-[100px] flex flex-row-reverse !max-w-none !w-fit !whitespace-nowrap px-[1.25rem] py-[0.625rem]',
        }}
      />
    </div>
  )
}

export default AddListing
