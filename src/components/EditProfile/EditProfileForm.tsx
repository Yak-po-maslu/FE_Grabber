import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { editProfileSchema } from '../../features/userValidation'
import { TEditUserForm, TUserProfile } from '../../types/types'
import submitUserData from '../../api/useSubmitUserData'
import submitUserPhoto from '../../api/useSubmitUserPhoto'
import { PATHS } from '../../paths'
import EditIcon from '../../assets/images/editPencil.svg?react'
import {
  UploadAvatar,
  ProfileInput,
  DeleteUserPhoto,
  Button,
  CustomToaster,
} from '../../components'

type Props = {
  user: TUserProfile
}

const EditProfileForm = ({ user }: Props) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const initialValues = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    phone_number: user?.phone_number,
    location: user?.location || '',
    user_photo:
      typeof user?.user_photo === 'string' || user?.user_photo instanceof File
        ? user.user_photo
        : user?.user_photo,
    description: user.description,
    social_links: user?.social_links?.[0]?.url,
  }

  const { mutate: profileMutation } = submitUserData()
  const { mutate: photoMutation } = submitUserPhoto()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    getValues,
    resetField,
    formState: { dirtyFields, errors },
  } = useForm<TEditUserForm>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
  })

  const onSubmit = async () => {
    const allValues = getValues()
    const { user_photo, ...data } = allValues
    const parsedLink = data?.social_links?.replace('@', '') || ''
    const submitData = {
      ...data,
      social_links: data?.social_links
        ? [
            {
              platform: 'instagram',
              url: data.social_links.includes('https://www.instagram.com/')
                ? parsedLink
                : `https://www.instagram.com/${parsedLink}`,
            },
          ]
        : [],
    }

    const { user_photo: avatar, ...userData } = initialValues
    const isDataChanged = JSON.stringify(submitData) !== JSON.stringify(userData)
    const isPhotoChanged = !(avatar as string).includes((user_photo as File)?.name)
    const noChanges = !isDataChanged && !isPhotoChanged

    if (noChanges) {
      toast.error('Змін не виявлено', {
        id: 'profile-editor-toasts',
      })
    }

    try {
      const mutations = []
      if (isDataChanged) mutations.push(profileMutation(submitData))
      if (user_photo instanceof File && isPhotoChanged) mutations.push(photoMutation(user_photo))

      await Promise.all(mutations)
      navigate(PATHS.PROFILE.profile)
    } catch (error) {
      toast.error('Помилка при збереженні', { id: 'profile-editor-toasts' })
    }

    setIsSubmit(true)
  }

  const isDirtyData = Object.keys(dirtyFields).some(
    (field) => field !== 'user_photo' || !errors.user_photo,
  )
  const canSubmit =
    isDirtyData &&
    Object.keys(errors).filter((key) => key !== 'user_photo').length === 0 &&
    !isSubmit

  useEffect(() => {
    if (errors.user_photo) {
      const timer = setTimeout(() => resetField('user_photo'), 3000)

      return () => clearTimeout(timer)
    }
  }, [errors])

  return (
    <>
      {user && (
        <div className="mt-[6.44rem]">
          <div className="ml-[120px] p-[0.625rem] text-h3 text-grey-950">Редагування профілю</div>
          <form
            className="mx-auto mt-[5.37rem] max-w-[74.86%]"
            onChange={() => setIsSubmit(false)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-[20px]">
              <div className="h-fit rounded-[20px] px-8 pt-8 shadow-blur">
                <Controller
                  name="user_photo"
                  control={control}
                  render={({ field }) => (
                    <UploadAvatar
                      uploadedPhoto={field.value}
                      onChange={(file) => field.onChange(file)}
                      error={errors.user_photo?.message}
                      userPhoto={user.user_photo as string}
                    />
                  )}
                />
                {user.user_photo && <DeleteUserPhoto />}
              </div>
              <div className="flex flex-1 flex-col rounded-[20px] p-8 shadow-blur">
                <ProfileInput
                  data={user.first_name}
                  labelText="Ім'я"
                  placeholder="Наприклад: Катерина"
                  name="first_name"
                  register={register}
                  error={errors.first_name}
                  inputType="text"
                />
                <ProfileInput
                  data={user.last_name}
                  labelText="Прізвище"
                  placeholder="Наприклад: Шевченко"
                  name="last_name"
                  register={register}
                  error={errors.last_name}
                  inputType="text"
                />
                <div className="flex">
                  <ProfileInput
                    data={user.email}
                    labelText="Email"
                    name="email"
                    inputType="email"
                    disabled={true}
                  />
                  <div className="ml-4 flex items-end">
                    <Link to={PATHS.PROFILE.change_email}>
                      <button className="editButton">
                        <EditIcon className="editIcon" />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex">
                  <ProfileInput
                    labelText="Password"
                    name="password"
                    data="********"
                    inputType="password"
                    disabled={true}
                  />
                  <div className="ml-4 flex items-end">
                    <Link to={PATHS.PROFILE.change_password}>
                      <button className="editButton">
                        <EditIcon className="editIcon" />
                      </button>
                    </Link>
                  </div>
                </div>
                <ProfileInput
                  data={user.phone_number}
                  labelText="Контактний номер"
                  name="phone_number"
                  register={register}
                  error={errors.phone_number}
                  inputType="tel"
                  placeholder="Наприклад: +380670000000"
                />
                <div className="flex flex-col">
                  <label className="pb-2 pt-8 text-b3 text-grey-800" htmlFor="description">
                    Про себе
                  </label>
                  <textarea
                    {...register('description')}
                    className={`input-text min-h-[104px] w-[799px] ${errors.description && 'border-error-default'}`}
                    placeholder="Опишіть свій досвід як майстра або розкажіть про особливості наданої послуги"
                    name="description"
                    id="description"
                    defaultValue={user.description}
                  />
                  {errors.description && (
                    <span className="text-error-default">{errors.description.message}</span>
                  )}
                </div>
                <ProfileInput
                  data={user.location || ''}
                  labelText="Місце виготовлення виробу/надання послуг"
                  name="location"
                  register={register}
                  error={errors.location}
                  inputType="text"
                  placeholder="Наприклад: Полтава"
                />
                <ProfileInput
                  data={user?.social_links?.[0]?.url || ''}
                  labelText="Додайте посилання на соцмережу"
                  name="social_links"
                  register={register}
                  error={errors?.social_links}
                  inputType="text"
                  placeholder="Наприклад: @kateryna.clay"
                />
              </div>
            </div>
            <div className="mx-auto mb-[5.06rem] mt-[5.37rem] flex justify-end gap-[24px]">
              <Link to={PATHS.PROFILE.profile}>
                <Button className="custom-button w-[285px] bg-grey-50 text-primary-950">
                  Скасувати зміни
                </Button>
              </Link>
              <Button className="custom-button w-[285px]" disabled={!canSubmit} type="submit">
                Зберегти зміни
              </Button>
            </div>
          </form>
        </div>
      )}
      <CustomToaster id="profile-editor-toasts" />
    </>
  )
}

export default EditProfileForm
