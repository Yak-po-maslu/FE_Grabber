import { useForm } from 'react-hook-form'
import { addAdsSchema } from '../features/adsValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { AdsImageUploader } from '../components'
import { z } from 'zod'
import useAdsCreate from '../api/adsCreate'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export type TFormData = z.infer<typeof addAdsSchema>

const defaultValues: TFormData = {
  title: '',
  description: '',
  category: '',
  images: [],
  price: '0',
  contact_name: '',
  email: '',
  phone: '',
  location: '',
}

const categories = {
  electronics: 'Електроніка',
  clothing: 'Одяг',
  transport: 'Транспорт',
  'real-estate': 'Нерухомість',
  children: 'Дитяче',
  other: 'Інше',
}

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TFormData>({
    defaultValues,
    resolver: zodResolver(addAdsSchema),
  })

  const { mutateAsync: createAds } = useAdsCreate()

  const navigate = useNavigate()

  const handleSubmitForm = async (data: TFormData) => {
    const newAds = {
      title: data.title,
      description: data.description,
      price: data.price,
      status: 'draft' as const,
      category: data.category,
      images: data.images.map((image) => {
        if (typeof image === 'string') return image
        return URL.createObjectURL(image)
      }),
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone,
      location: data.location,
    }

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

  const watchCategory = watch('category')
  const watchTitle = watch('title')
  const watchDescription = watch('description')
  const watchLocation = watch('location')

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
            {Object.entries(categories).map(([key, value]) => {
              return (
                <label
                  className={`text-regular transition-[background-color, color] cursor-pointer rounded-full border border-primary-900 px-4 py-2 text-b4 duration-300 ${
                    watchCategory === key
                      ? 'bg-primary-900 text-primary-30'
                      : 'text-primary-900 hover:bg-primary-900 hover:text-primary-30'
                  }`}
                  key={key + value}
                >
                  {value}
                  <input
                    type="radio"
                    {...register('category')}
                    value={key}
                    id={key}
                    className="appearance-none"
                  />
                </label>
              )
            })}
          </div>
          {errors.category && <p className="error-text">{errors.category.message}</p>}
        </section>

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
              placeholder="Приклад: Полтава"
              className={`input-add-product-section ${errors.location || watchLocation.length >= 101 ? 'outline-1 outline-error-default' : ''}`}
            />
          </label>
          <div
            className={`flex justify-between text-d1 ${errors.title ? 'text-error-default' : 'text-grey-400'}`}
          >
            <p>Мінімум 3 символи</p>
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

          <AdsImageUploader setValue={setValue} watch={watch} />
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
          <button type="submit" className="button px-16 py-2">
            Опублікувати
          </button>
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

export default AddProduct
