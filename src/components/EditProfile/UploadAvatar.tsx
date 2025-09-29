import { useEffect, useRef, useState } from 'react'
import DefaultAvatar from '../../assets/images/defaultAvatar.svg?react'
import Button from '../Button/Button'

type UploadAvatarProps = {
  uploadedPhoto?: string | File
  onChange: (file: File) => void
  error?: string
  userPhoto: string
}

const UploadAvatar = ({ uploadedPhoto, onChange, error, userPhoto }: UploadAvatarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      preview && URL.revokeObjectURL(preview)
      const url = URL.createObjectURL(file)
      setPreview(url)
      onChange(file)
    }
  }

  useEffect(() => {
    if (uploadedPhoto instanceof File) {
      const url = URL.createObjectURL(uploadedPhoto)
      setPreview(url)

      return () => URL.revokeObjectURL(url)
    } else if (typeof uploadedPhoto === 'string') {
      setPreview(uploadedPhoto)
    } else {
      setPreview(null)
    }
  }, [uploadedPhoto])

  useEffect(() => {
    if (!userPhoto) setPreview('')
  }, [userPhoto])

  return (
    <div className="avatar-upload">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div className="relative mx-auto active:scale-95" onClick={() => inputRef.current?.click()}>
        {preview && !error ? (
          <img
            src={preview}
            alt="User avatar"
            className="h-[221px] w-[221px] rounded-[20px] object-cover object-[50%_20%]"
          />
        ) : (
          (userPhoto && (
            <img
              src={userPhoto}
              alt="Initial avatar"
              className="h-[221px] w-[221px] rounded-[20px] object-cover object-[50%_20%]"
            />
          )) || (
            <div className="flex h-[221px] w-[221px] items-center justify-center rounded-[20px] bg-grey-100">
              <DefaultAvatar className="text-primary-950" />
            </div>
          )
        )}
        {error && <div className="text-error-default">{error}</div>}
      </div>
      <div className="flex flex-col">
        <Button
          className="custom-button w-[221px] whitespace-nowrap"
          onClick={() => inputRef.current?.click()}
        >
          Завантажити фото
        </Button>
      </div>
    </div>
  )
}

export default UploadAvatar
