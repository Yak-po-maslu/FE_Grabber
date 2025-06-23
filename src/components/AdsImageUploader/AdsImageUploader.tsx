import React, { useRef } from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { TFormData } from '../../pages/AddProduct'
import imgPlaceholder from '../../assets/icons/photo-icon.svg'

// Описуємо пропси для компонента
interface AdsImageUploaderProps {
  setValue: UseFormSetValue<TFormData>
  watch: UseFormWatch<TFormData>
}

const AdsImageUploader: React.FC<AdsImageUploaderProps> = ({ setValue, watch }) => {
  // Реф для input type="file"
  const fileInputRef = useRef<HTMLInputElement>(null)
  // Отримуємо поточний масив зображень з форми
  const images = watch('images')

  // Обробка додавання файлів
  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files) // Перетворюємо FileList у масив
    const currentFiles = watch('images') || [] // Поточні файли

    // Об'єднуємо старі та нові файли, максимум 5
    const combined = [...currentFiles, ...newFiles].slice(0, 5)
    setValue('images', combined, { shouldValidate: true }) // Оновлюємо значення у формі
  }

  // Обробка події drag&drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  // Відкриваємо діалог вибору файлів
  const handleClick = () => {
    fileInputRef.current?.click()
  }

  // Очищення всіх зображень
  const clearImages = () => {
    setValue('images', [], { shouldValidate: true })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Видалення одного зображення за індексом
  const handleRemoveImage = (index: number) => {
    const currentFiles = watch('images') || []
    const updated = [...currentFiles]
    updated.splice(index, 1) // Видаляємо елемент за індексом
    setValue('images', updated, { shouldValidate: true })
  }

  return (
    <div className="rounded-lg border border-dashed p-4 text-center">
      {/* Прев'ю зображень (максимум 5) */}
      <div className="mb-4 flex flex-wrap justify-start gap-2">
        {[...Array(4)].map((_, index) => {
          const image = images[index]

          return (
            <div
              key={index}
              className="group relative flex aspect-[183/127] w-[24%] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-transparent transition-colors duration-300 hover:bg-grey-200"
              onClick={(e) => {
                e.stopPropagation()
                handleClick()
              }}
            >
              {image ? (
                <>
                  {/* Відображаємо зображення (або url, або File) */}
                  <img
                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                    alt="uploaded"
                    className="h-full w-full object-cover"
                  />
                  {/* Кнопка видалення зображення */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveImage(index)
                    }}
                    className="absolute right-1 top-1 rounded-full bg-red-600 px-2 text-white"
                  >
                    ×
                  </button>
                </>
              ) : (
                // Плейсхолдер для порожньої "клітинки"
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="rounded-lg p-4 text-center"
                >
                  <span className="hidden text-d1 text-grey-500 underline active:text-primary-900 group-hover:inline">
                    Додати зображення
                  </span>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto text-grey-400 group-hover:hidden"
                  >
                    <path
                      d="M30.3125 12.8125H25.625V10.9375H13.9062V12.8125H9.21875C8.55571 12.8125 7.91982 13.0759 7.45098 13.5447C6.98214 14.0136 6.71875 14.6495 6.71875 15.3125V28.2812C6.71875 28.9443 6.98214 29.5802 7.45098 30.049C7.91982 30.5179 8.55571 30.7812 9.21875 30.7812H30.3125C30.9755 30.7812 31.6114 30.5179 32.0803 30.049C32.5491 29.5802 32.8125 28.9443 32.8125 28.2812V15.3125C32.8125 14.6495 32.5491 14.0136 32.0803 13.5447C31.6114 13.0759 30.9755 12.8125 30.3125 12.8125ZM19.765 29.375C15.5875 29.375 12.19 25.975 12.19 21.7975C12.19 17.62 15.5875 14.22 19.765 14.22C23.9425 14.22 27.3425 17.62 27.3425 21.7975C27.3425 25.975 23.9425 29.3725 19.765 29.3725V29.375ZM19.765 16.7188C19.098 16.7188 18.4375 16.8503 17.8213 17.1056C17.205 17.361 16.6451 17.7352 16.1735 18.2069C15.7019 18.6786 15.3278 19.2386 15.0727 19.8549C14.8175 20.4712 14.6862 21.1317 14.6862 21.7987C14.6863 22.4658 14.8178 23.1263 15.0731 23.7425C15.3285 24.3587 15.7027 24.9186 16.1744 25.3902C16.6461 25.8618 17.2061 26.2359 17.8224 26.4911C18.4387 26.7463 19.0992 26.8776 19.7662 26.8775C21.1135 26.8773 22.4056 26.342 23.3582 25.3892C24.3107 24.4364 24.8458 23.1442 24.8456 21.7969C24.8455 20.4496 24.3101 19.1575 23.3573 18.205C22.4045 17.2524 21.1123 16.7173 19.765 16.7175V16.7188Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Кнопка очищення всіх зображень */}
      <div className="flex justify-start gap-4">
        {images.length > 0 && (
          <button
            type="button"
            onClick={clearImages}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Очистити
          </button>
        )}
      </div>

      {/* Прихований input для вибору файлів */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}

export default AdsImageUploader
