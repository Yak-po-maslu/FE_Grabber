import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userProfileStore from '../../store/userProfileStore'
import DefaultAvatar from '../../assets/images/defaultAvatar.svg?react'
import { PATHS } from '../../paths'
import { Button } from '../../components'
import LogoutModal from './LogoutModal'

const Menu = () => {
  const user_photo = userProfileStore((state) => state.userInfo.user_photo)
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="relative inline-block">
      <Button onClick={() => setIsOpen(!isOpen)} className="border-none bg-transparent p-0">
        {user_photo ? (
          <img
            src={user_photo as string}
            alt="avatar"
            className="h-10 w-10 rounded-full border border-white object-cover"
          />
        ) : (
          <DefaultAvatar className="text-primary-50" />
        )}
      </Button>
      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-[20px] border bg-primary-50 text-grey-800 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setIsOpen(false)
              navigate(PATHS.PROFILE.profile)
            }}
            className="w-full px-4 py-2 transition-colors duration-300 hover:bg-secondary-brown-100"
          >
            Профіль
          </button>
          <button className="w-full px-4 py-2 transition-colors duration-300 hover:bg-secondary-brown-100">
            Мої оголошення
          </button>
          <Link to={PATHS.PRODUCTS.favorites}>
            <button className="w-full px-4 py-2 transition-colors duration-300 hover:bg-secondary-brown-100">
              Вподобані
            </button>
          </Link>
          <div className="mx-4 h-px bg-grey-800"></div>
          <button
            onClick={() => {
              setIsOpen(false)
              setShowModal(true)
            }}
            className="w-full px-4 py-2 transition-colors duration-300 hover:bg-secondary-brown-100"
          >
            Вихід
          </button>
        </div>
      )}

      {showModal && <LogoutModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default Menu
