import { Link } from 'react-router-dom'
import ArrowIcon from '../../../assets/icons/arrow-icon.svg?react'
import LocationIcon from '../../../assets/icons/location-icon.svg?react'
import defaultAvatar from '../../../assets/images/defaultAvatar.svg'
import { FavoriteIcon } from '../../../components'
import { PATHS } from '../../../paths'
import { TListing } from '../../../types/adsTypes'

type Props = {
  ad: TListing
  cardClassName?: string
}

const RecommendedCard = ({ ad, cardClassName = '' }: Props) => {
  return (
    <section className={cardClassName}>
      <div
        tabIndex={0}
        className="card-recommended mx-auto flex h-full flex-col justify-between rounded-[20px] p-6 shadow-transp-50"
      >
        <div className="relative">
          <img
            src={ad.images[0] || defaultAvatar}
            alt={ad.title}
            className="h-[250px] w-full rounded-[15px] object-cover"
          />
          <div className="absolute right-2 top-2 z-10">
            <FavoriteIcon product_id={ad.id} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-8">
          <h3 className="line-clamp-1 min-h-[28px] text-s1 text-grey-950">{ad.title}</h3>
          <Link to={PATHS.PRODUCTS.details.replace(':ad_id', ad.id.toString())}>
            <ArrowIcon aria-label="Arrow icon" className="text-primary-950" />
          </Link>
        </div>

        <p className="mt-3 overflow-hidden truncate text-ellipsis whitespace-nowrap text-b4 text-grey-500">
          {ad.description}
        </p>
        <p className="mt-3 text-b3 text-grey-950">{ad.price} грн</p>

        <div className="mt-6 flex items-center gap-4 pb-2">
          <LocationIcon aria-label="Location" className="text-primary-950" />
          <p className="text-b4 text-grey-500">{ad.location}</p>
        </div>
      </div>
    </section>
  )
}

export default RecommendedCard
