import React from 'react'
import ListingCard from '../ListingCard/ListingCard'
import { TListingGet } from '../../types/listingsTypes'

interface ListingsProps {
  listings: TListingGet[]
}

const Listings: React.FC<ListingsProps> = ({ listings }) => {
  return (
    <section className={`grid grid-cols-auto-fill-385 gap-5`}>
      {listings.map((listing) => (
        <ListingCard listing={listing} key={listing.created_at} />
      ))}
    </section>
  )
}

export default Listings
