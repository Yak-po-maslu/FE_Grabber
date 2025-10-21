import { useEffect, useRef, useState } from 'react'
import useCartStore from '../../store/cartStore.ts'
import BasketIcon from '../../assets/images/basketIcon.svg?react'

const CartMenu = () => {
  const { items, addToCart, removeFromCart, clearCart } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [])

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="relative inline-block" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)} className="border-none bg-transparent p-0">
        <BasketIcon className="h-10 w-10" />
        {totalCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-warning-notification-300 text-d1 text-primary-950">
            {totalCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3.5 min-w-[237px] overflow-hidden rounded-[20px] border bg-primary-50 text-secondary-brown-900 shadow-xl">
          {items.length === 0 ? (
            <p className="w-full px-4 py-2 text-d1 transition-colors duration-300 hover:bg-secondary-brown-100">
              Ваш кошик порожній
            </p>
          ) : (
            <ul className="flex w-full flex-col items-center justify-between">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex w-full items-center justify-between gap-2 px-2 py-2 transition-colors duration-300 hover:bg-secondary-brown-100"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-8 w-10 flex-shrink-0 rounded-sm object-cover"
                    />
                  )}
                  <div>
                    <span className="line-clamp-2 text-b4 text-secondary-brown-900">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full border-2 border-secondary-brown-300 px-1 text-d1 text-secondary-brown-300 hover:text-primary-950"
                    >
                      −
                    </button>
                    <span className="text-secondary-brown-900">{item.quantity}</span>
                    <button
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      className="rounded-full border-2 border-secondary-brown-300 px-1 text-d1 text-secondary-brown-300 hover:text-primary-950"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
              <div className="mx-4 h-px w-full bg-grey-400"></div>
              <button
                onClick={clearCart}
                className="w-full px-4 py-2 transition-colors duration-300 hover:bg-secondary-brown-100"
              >
                Очистити кошик
              </button>
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default CartMenu
