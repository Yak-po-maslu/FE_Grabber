import { Modal } from '../../components'
import ConfettiImg from '../../assets/images/Confetti.svg?react'
import Subscribed from '../../assets/images/subscribed.svg?react'

type Props = {
  onClose: () => void
  disablePortal?: boolean
  modalClassName?: string
}

const SuccessModal = ({ onClose, disablePortal, modalClassName }: Props) => {
  return (
    <Modal
      onClose={onClose}
      disablePortal={disablePortal}
      className={modalClassName}
      contentClassName="relative w-full h-[284px] max-w-[1200px] bg-white rounded-xl p-10 pointer-events-auto overflow-hidden"
    >
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <button className="close-button absolute right-6 top-4" onClick={onClose}></button>
        <ConfettiImg
          aria-label="Confetti"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain opacity-85"
        />

        <div className="relative z-10">
          <h2 className="text-h2 text-primary-900">Підписка оформлена!</h2>
          <p className="text-b3 text-primary-900">
            Тепер ви будете першими отримувати інформацію про оновлення
          </p>
          <Subscribed aria-label="Subscribed" className="mx-auto mt-4" />
        </div>
      </div>
    </Modal>
  )
}

export default SuccessModal
