import defaultProfileAvatar from '../assets/images/defaultProfileAvatar.svg'
import EditIcon from '../assets/images/editIcon.svg?react'
import { formatDate } from '../features/formatDate'
import { Link } from 'react-router-dom'
import { PATHS } from '../paths'
import ProfileField from '../components/ProfileField/ProfileField'
import userProfileStore from '../store/userProfileStore'
import { Button } from '../components'

const Profile = () => {
  const userData = userProfileStore((state) => state)
  const userInfo = userData.userInfo

  return (
    <>
      {!userData.isLoading && (
        <div className="mx-auto mt-[6.43rem] max-w-[80%] p-[3px]">
          <h1 className="mb-[5.93rem] p-[0.625rem] text-h3 font-medium">Мій профіль</h1>
          <div className="flex justify-center gap-[3.06rem]">
            <div className="flex max-w-[46%] gap-5 rounded-[25px] py-[4.37rem] pl-[1.94rem] pr-[1.94rem] shadow-blur">
              <img
                className="h-[173px] w-[173px] rounded-[20px] object-cover object-[50%_20%]"
                src={userInfo.user_photo ? (userInfo.user_photo as string) : defaultProfileAvatar}
                alt=""
              />
              <div className="column flex flex-col">
                <p className="p-[0.625rem] pr-0 text-b2">{`${userInfo.first_name} ${userInfo.last_name}`}</p>
                <p className="p-[0.625rem] pr-0 text-b4">Місцезнаходження: {userInfo.location}</p>
                <p className="p-[0.625rem] pr-0 text-b4">Номер телефону: {userInfo.phone_number}</p>
                {userInfo?.date_joined && (
                  <p className="p-[0.625rem] text-b4">
                    Дата реєстрації: {formatDate(userInfo.date_joined)}
                  </p>
                )}
              </div>
            </div>
            <div className="max-w-[46%] rounded-[25px] px-[1.25rem] pt-[1.87rem] shadow-blur">
              <div className="pl-[1.25rem]">
                <div className="flex items-center gap-[6.06rem] py-[1.15rem] pl-[0.625rem]">
                  <p className="text-b2 font-medium">Персональна інформація</p>
                  <Link to={PATHS.PROFILE.edit}>
                    <EditIcon className="text-grey-50" />
                  </Link>
                </div>
                <div className="text-b4">
                  <ProfileField text="Ім’я" data={userInfo.first_name} />
                  <ProfileField text="Прізвище" data={userInfo.last_name} />
                  <ProfileField text="Email" data={userInfo.email} />
                  <ProfileField text="Номер телефону" data={userInfo.phone_number} />
                </div>
              </div>
            </div>
          </div>
          <div className="m-auto flex max-w-[94%] justify-between">
            <Link to={PATHS.PROFILE.edit}>
              <Button className="custom-button w-profile-button">Редагувати профіль</Button>
            </Link>
            <Link to={PATHS.PROFILE.changePassword}>
              <Button className="custom-button w-profile-button">Редагувати пароль</Button>
            </Link>
          </div>
          <section className="pt-[2.78%]">
            <div className="mb-[4.25rem] p-[0.625rem] text-b1 font-medium">Мої оголошення</div>
          </section>
        </div>
      )}
    </>
  )
}

export default Profile
