import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userProfileStore from '../../store/userProfileStore'
import defaultAvatar from '../../assets/images/defaultAvatar.svg'
import Button from '../Button/Button'
import LogoutModal from './LogoutModal'
import { PATHS } from '../../paths'

const Menu = () => {
  const user_photo = userProfileStore((state) => state.userInfo.user_photo)
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="relative inline-block">
      <Button onClick={() => setIsOpen(!isOpen)} className="border-none bg-transparent p-0">
        <img
          src={user_photo ? (user_photo as string) : defaultAvatar}
          alt="avatar"
          className="h-10 w-10 rounded-full border border-white object-cover"
        />
      </Button>

      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border bg-white text-black shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setIsOpen(false)
              navigate(PATHS.PROFILE.profile)
            }}
            className="w-full px-4 py-2 text-left transition-colors duration-300 hover:bg-grey-200"
          >
            Профіль
          </button>
          <button
            onClick={() => {
              setIsOpen(false)
              setShowModal(true)
            }}
            className="w-full px-4 py-2 text-left transition-colors duration-300 hover:bg-grey-200"
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
