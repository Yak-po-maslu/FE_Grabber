import icon from '../../assets/icons/vector2.svg'
import symbolIcon from '../../assets/images/symbol3.svg'
import frameIcon from '../../assets/images/frame355.svg'

const AnimationSection = () => {
  return (
    <div className="relative m-auto mt-[167px] max-w-container">
      <div className="flex w-full items-center">
        <div className="flex flex-1 justify-evenly gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <img key={i} src={icon} className="h-[23px] w-[37px]" alt="" />
          ))}
        </div>
      </div>

      <div className="flex h-[85px] w-full rounded-t-[20px] border border-grey-950 bg-secondary-brown-100 p-4 font-kyiv text-h21">
        <div className="relative w-full overflow-hidden text-left">
          <div className="absolute w-full animate-slide1">
            <p>Купуйте виготовлене</p>
          </div>
          <div className="absolute w-full animate-slide2">
            <p>Продавайте виготовлене</p>
          </div>
        </div>
        <div className="relative w-full overflow-hidden text-right">
          <div className="absolute w-full animate-slide1">
            <p>Користуйтеся послугами</p>
          </div>
          <div className="absolute w-full animate-slide2">
            <p>Продавайте послуги</p>
          </div>
        </div>
      </div>

      <img className="m-auto" src={symbolIcon} alt="" />
      <img className="m-auto" src={frameIcon} alt="" />
    </div>
  )
}

export default AnimationSection
