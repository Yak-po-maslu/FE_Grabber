import { Link } from 'react-router-dom'
import { TAd } from '../../types/productTypes'
import ArrowIcon from '../../assets/icons/arrow-icon.svg?react'
import LocationIcon from '../../assets/icons/location-icon.svg?react'

type Props = {
  ad: TAd
  className?: string
}

const RecommendedCard = ({ ad, className }: Props) => {
  return (
    <section className={`overflow-hidden ${className ?? ''}`}>
      <div className="h-min-[490px] mx-auto flex w-[540px] flex-col rounded-2xl bg-primary-30 p-6 shadow-xl">
        <img
          src={ad.images?.[0]?.image || '/defaultAvatar.svg'}
          alt={ad.title}
          className="h-[250px] w-full rounded-xl object-cover pb-8"
        />

        <div className="flex items-center justify-between">
          <h3 className="text-s1 text-grey-950">{ad.title}</h3>
          <Link to="#">
            <ArrowIcon aria-label="Arrow icon" className="text-grey-950" />
          </Link>
        </div>

        <p className="mt-3 text-b4 text-grey-500">{ad.description}</p>
        <p className="mt-3 text-b3 text-grey-950">{ad.price} грн</p>

        <div className="mt-6 flex items-center gap-2 pb-2">
          <LocationIcon aria-label="Location" className="text-primary-900" />
          <p className="text-b4 text-grey-500">{ad.location}</p>
        </div>
      </div>
    </section>
  )
}

export default RecommendedCard
