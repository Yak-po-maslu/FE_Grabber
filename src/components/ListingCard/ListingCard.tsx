import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../paths'
import { TListingGet } from '../../types/listingsTypes'
import { FavoriteIcon } from '../../components'
import ArrowIcon from '../../assets/icons/arrow-icon.svg?react'
import LocationIcon from '../../assets/icons/location-icon.svg?react'

interface ListingCardProps {
  listing: TListingGet
  listingCardClass?: string
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, listingCardClass = '' }) => {
  return (
    <Link
      to={PATHS.PRODUCTS.details.replace(':ad_id', listing.id.toString())}
      className={`listing-card ${listingCardClass}`}
    >
      <img src={listing.images[0]} alt="favorite-icon" className="image" />
      <FavoriteIcon product_id={listing.id.toString()} addClass="favorite-icon" />
      <h2 className="title">{listing.title}</h2>
      <ArrowIcon className="arrow-icon" />
      <p className="description" title={listing.description}>
        {listing.description}
      </p>
      <p className="price">{listing.price} грн.</p>
      <LocationIcon className="location-icon" />
      <p className="location">{listing.location}</p>
    </Link>
  )
}

export default ListingCard
