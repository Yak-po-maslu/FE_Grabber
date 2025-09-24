import { Link, useParams } from 'react-router-dom'
import { Button, Menu } from '../../components'
import { PATHS } from '../../paths'
import userProfileStore from '../../store/userProfileStore'
import SearchIcon from '../../assets/images/searchIcon.svg?react'
import BasketIcon from '../../assets/images/basketIcon.svg?react'
import BurgerMenu from '../../assets/icons/burger_menu.svg?react'
import CategoriesMenu from './CategoriesMenu'
import { useEffect, useRef, useState } from 'react'
import useCartStore from '../../store/cartStore.ts'

const Navbar = () => {
  const user = userProfileStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const { category } = useParams()
  const cartItems = useCartStore((state) => state.items)
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <h1 className="whitespace-nowrap text-[20px] font-medium">
        <Link to={PATHS.HOME}>Grabber</Link>
      </h1>

      <div className="relative flex-1">
        <div className="group flex rounded-[20px] border border-transp-50 px-8 text-b3 text-transp-50 hover:border-primary-50 hover:text-primary-50">
          <input
            type="text"
            placeholder="Пошук товарів"
            className="ml-4 h-[40px] w-full rounded-[20px] bg-primary-950 placeholder:pl-[1rem] placeholder:text-b3 placeholder:font-normal placeholder:text-secondary-brown-100/50 focus:border-r-0 focus:outline-none"
          />
          <SearchIcon className="absolute left-4 top-1/2 block h-[24px] w-[24px] -translate-y-1/2 transform text-transp-50" />
          <div ref={ref} onClick={() => setIsOpen(!isOpen)} className="flex">
            <button className="whitespace-nowrap pr-4">
              | {(category && decodeURIComponent(category)) || 'Категорії'}
            </button>
            <BurgerMenu className="m-auto w-[24px] cursor-pointer text-transp-50 group-hover:text-primary-50" />
          </div>
          {isOpen && <CategoriesMenu />}
        </div>
      </div>
      <Link to={PATHS.PRODUCTS.add}>
        <button className="light-button min-w-btn-medium">Створити оголошення</button>
      </Link>
      <div className="relative">
        <Link to="#">
          <BasketIcon />
          {totalCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
      {user.isLoggedIn ? (
        <Menu />
      ) : (
        <Link to={PATHS.AUTH.login}>
          <Button
            text="Вхід"
            className="rounded-[20px] border border-white px-6 py-[0.5rem] text-b4 text-white transition hover:bg-white hover:text-primary-950"
          ></Button>
        </Link>
      )}
    </>
  )
}

export default Navbar
