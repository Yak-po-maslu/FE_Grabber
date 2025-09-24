import { Link } from 'react-router-dom'
import ornament1 from '../../assets/images/Ornament1.svg'
import ornament2 from '../../assets/images/Ornament2 .svg'
import Button from '../Button/Button'
import { PATHS } from '../../paths'

const BuySellSection = () => {
  return (
    <div className="relative my-[96px] flex max-h-[844px] justify-evenly bg-secondary-brown-100 pt-[96px] text-center">
      <div className="flex flex-col gap-4">
        <p className="font-kyiv text-h21">
          Підтримате українське <br /> виробництво
        </p>
        <p className="text-b2">Купуйте товари місцевих виробників</p>
        <Link to="#">
          <Button className="mt-8 w-[223px]" text="Купити" />
        </Link>
        <img src={ornament1} className="mt-9" />
      </div>
      <div className="relative">
        <img className="relative bottom-[110px]" src={ornament2} />
        <div className="relative bottom-[190px] flex flex-col gap-4">
          <p className="font-kyiv text-h21">
            Продавайте ваш виріб <br /> або надавайте сервіс
          </p>
          <p className="text-b2">Локально або по всій Україні</p>
          <Link to={PATHS.AUTH.register}>
            <Button className="mt-8 min-w-[223px]" text="Зареєструватися" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BuySellSection
