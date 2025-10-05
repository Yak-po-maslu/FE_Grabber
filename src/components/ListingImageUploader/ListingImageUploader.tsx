import React, { useRef } from 'react'
import { UseFormSetValue, UseFormWatch, UseFormSetError } from 'react-hook-form'
import { TFormData } from '../../pages/AddListing'
import IconPlaseholder from '../../assets/icons/photo-icon.svg?react'
import { validateImage } from '../../utils/validateImageFile'

// Описуємо пропси для компонента
interface ListingImageUploaderProps {
  setValue: UseFormSetValue<TFormData>
  watch: UseFormWatch<TFormData>
  setError: UseFormSetError<TFormData>
}

const ListingImageUploader: React.FC<ListingImageUploaderProps> = ({
  setValue,
  watch,
  setError,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const images = watch('images')

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files)
    const currentFiles = watch('images') || []

    for (const file of newFiles) {
      const error = validateImage(file)

      if (error) {
        setError('images', { message: error })

        return
      }
    }

    const combined = [...currentFiles, ...newFiles].slice(0, 5)
    setValue('images', combined, { shouldValidate: true })
    setError('images', { type: 'manual', message: '' }) // очищаємо помилку, якщо все ок
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const clearImages = () => {
    setValue('images', [], { shouldValidate: true })
    setError('images', { type: 'manual', message: '' })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleRemoveImage = (index: number) => {
    const currentFiles = watch('images') || []
    const updated = [...currentFiles]
    updated.splice(index, 1)
    setValue('images', updated, { shouldValidate: true })
    setError('images', { type: 'manual', message: '' })
  }

  return (
    <div
      className="rounded-lg border border-dashed text-center outline-secondary-brown-700 focus:outline-2"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
    >
      {/* Прев'ю зображень (максимум 5) */}
      <div className="mb-4 flex flex-wrap justify-start gap-5">
        {[...Array(4)].map((_, index) => {
          const image = images[index]

          return (
            <div
              key={index}
              className="group relative flex aspect-[183/127] w-[23%] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-secondary-brown-100 transition-colors duration-300 hover:outline-1 hover:outline-grey-400"
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
                  className="rounded-lg text-center"
                >
                  <span className="hidden text-d1 text-secondary-brown-900 underline active:text-primary-950 group-hover:inline">
                    Додати зображення
                  </span>
                  {/* Іконка для плейсхолдера */}
                  <IconPlaseholder className="mx-auto text-[40px] text-grey-400 group-hover:hidden" />
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

export default ListingImageUploader
