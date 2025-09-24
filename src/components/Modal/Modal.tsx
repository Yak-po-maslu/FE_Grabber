import React, { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'

type ModalProps = {
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden' // Блокуємо прокрутку

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = '' // Відновлюємо прокрутку при розмонтуванні
    }
  }, [onClose])

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative overflow-y-auto rounded-xl bg-white px-6 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}></button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  )
}

export default Modal
