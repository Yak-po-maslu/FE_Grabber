import { useEffect, useState } from 'react'
import ConfettiImg from '../../assets/images/Confetti.svg?react'
import Subscribed from '../../assets/images/subscribed.svg?react'

type Props = {
  onClose: () => void
}

const SuccessModal = ({ onClose }: Props) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }

  useEffect(() => {
    const timer = setTimeout(handleClose, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-white p-10 shadow-lg transition-all duration-300 ease-in-out ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      <button className="close-button absolute right-6 top-4" onClick={handleClose}></button>
      <ConfettiImg
        aria-label="Confetti"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain opacity-85"
      />

      <div className="relative z-10 text-center">
        <h2 className="text-h2 text-primary-950">Підписка оформлена!</h2>
        <p className="text-b3 text-primary-950">
          Тепер ви будете першими отримувати інформацію про оновлення
        </p>
        <Subscribed aria-label="Subscribed" className="mx-auto mt-4" />
      </div>
    </div>
  )
}

export default SuccessModal
