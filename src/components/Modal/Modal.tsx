import React, { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'

type ModalProps = {
  onClose: () => void
  children: ReactNode
  className?: string
  contentClassName?: string
  disablePortal?: boolean
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  className = '',
  contentClassName = '',
  disablePortal = false,
}) => {
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

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 ${className}`}
      onClick={onClose}
    >
      <div
        className={`relative overflow-y-auto rounded-xl bg-white p-6 ${contentClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}></button>
        {children}
      </div>
    </div>
  )

  return disablePortal
    ? modalContent
    : ReactDOM.createPortal(modalContent, document.getElementById('modal-root') as HTMLElement)
}

export default Modal
