import React from 'react'
import FillStar from '../../assets/icons/star_filled.svg?react'
import HalfStars from '../../assets/icons/star_filled.svg?react'
import EmptyStar from '../../assets/icons/star_empty.svg?react'

type StarRatingProps = {
  rating: number
  maxStars?: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0)

  const stars = [
    ...Array(fullStars).fill('full'),
    ...(halfStar ? ['half'] : []),
    ...Array(emptyStars).fill('empty'),
  ]

  return (
    <div className="flex items-center gap-2 text-primary-950">
      {stars.map((type, index) => {
        if (type === 'full') return <FillStar key={type + index} />
        if (type === 'half') return <HalfStars key={type + index} />

        return <EmptyStar key={type + index} className="tex" />
      })}
    </div>
  )
}

export default StarRating
