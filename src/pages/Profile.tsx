import defaultProfileAvatar from '../assets/images/defaultProfileAvatar.svg'
import { useQuery } from '@tanstack/react-query'
import { User } from '../types/types'
import editIcon from '../assets/images/editIcon.png'
import Login from './Login'
import { formatDate } from '../features/formatDate'
import { Link } from 'react-router-dom'
import { PATHS } from '../paths'
import ProfileField from '../components/ProfileField/ProfileField'
import backendRequest from '../api/backendRequest'

const Profile = () => {
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => backendRequest<User>({ path: '/api/profile/' }),
    retry: 1,
    retryDelay: 1000,
  })

  return (
    <>
      {!isLoading && userData && (
        <div className="mx-auto mt-[6.43rem] max-w-[80%] p-[3px]">
          <h1 className="mb-[5.93rem] p-[0.625rem] text-px32 font-medium">Мій профіль</h1>
          <div className="flex justify-center gap-[3.06rem]">
            <div className="flex max-w-[46%] gap-5 rounded-[25px] py-[4.37rem] pl-[1.94rem] pr-[1.94rem] shadow-blur">
              <img src={defaultProfileAvatar} alt="" />
              <div className="column flex flex-col">
                <p className="p-[0.625rem] pr-0 text-px24">{`${userData.first_name} ${userData.last_name}`}</p>
                <p className="p-[0.625rem] pr-0 text-px16">Місцезнаходження: {userData.location}</p>
                <p className="p-[0.625rem] pr-0 text-px16">
                  Номер телефону: {userData.phone_number}
                </p>
                {userData?.date_joined && (
                  <p className="p-[0.625rem] text-px16">
                    Дата реєстрації: {formatDate(userData.date_joined)}
                  </p>
                )}
              </div>
            </div>
            <div className="max-w-[46%] rounded-[25px] px-[1.25rem] pt-[1.87rem] shadow-blur">
              <div className="pl-[1.25rem]">
                <div className="flex items-center gap-[6.06rem] py-[1.15rem] pl-[0.625rem] pr-[1.37rem]">
                  <p className="text-px24 font-medium">Персональна інформація</p>
                  <img src={editIcon} alt="" />
                </div>
                <div className="pr-[1.37rem] text-px16">
                  <ProfileField text="Ім’я" data={userData.first_name} />
                  <ProfileField text="Прізвище" data={userData.last_name} />
                  <ProfileField text="Email" data={userData.email} />
                  <ProfileField text="Номер телефону" data={userData.phone_number} />
                </div>
              </div>
            </div>
          </div>
          <Link to={PATHS.PROFILE.edit}>
            <button className="my-[6.75rem] rounded-[20px] bg-[#2D336B] px-[2.72rem] py-[0.625rem] text-px16 text-[#F8F8F8]">
              Редагувати профіль
            </button>
          </Link>
          <section className="pt-[2.78%]">
            <div className="mb-[4.25rem] p-[0.625rem] text-px32 font-medium">Мої оголошення</div>
          </section>
        </div>
      )}
      {isError && (
        <div>
          <Login />
        </div>
      )}
    </>
  )
}

export default Profile
