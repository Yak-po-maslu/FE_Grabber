import { Link } from 'react-router-dom'
import { AdType } from '../../../types/productTypes.ts'
import ArrowIcon from '../../../assets/icons/arrow-icon.svg?react'
import LocationIcon from '../../../assets/icons/location-icon.svg?react'
import defaultAvatar from '../../../assets/images/defaultAvatar.svg'

type Props = {
  ad: AdType
  cardClassName: string
}

const RecommendedCard = ({ ad, cardClassName = '' }: Props) => {
  return (
    <section className={cardClassName}>
      <div
        tabIndex={0}
        className="card-recommended mx-auto flex h-full flex-col justify-between rounded-[20px] p-6 shadow-transp-50"
      >
        <div>
          <img
            src={ad.images[0] || defaultAvatar}
            alt={ad.title}
            className="h-[250px] w-full rounded-[15px] object-cover"
          />

          <div className="flex items-center justify-between pt-8">
            <h3 className="text-s1 text-grey-950">{ad.title}</h3>
            <Link to="#">
              <ArrowIcon aria-label="Arrow icon" className="text-grey-950" />
            </Link>
          </div>

          <p className="mt-3 truncate text-b4 text-grey-500">{ad.description}</p>
          <p className="mt-3 text-b3 text-grey-950">{ad.price} грн</p>
        </div>

        <div className="mt-6 flex items-center gap-4 pb-2">
          <LocationIcon aria-label="Location" className="text-primary-900" />
          <p className="text-b4 text-grey-500">{ad.location}</p>
        </div>
      </div>
    </section>
  )
}

export default RecommendedCard
