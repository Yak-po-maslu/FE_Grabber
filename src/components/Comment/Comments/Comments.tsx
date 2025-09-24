import React from 'react'
import { StarRating } from '../../index.ts'
import { useLocation } from 'react-router-dom'
import useFetchComments from '../../../api/useFetchComments.ts'
import UserAvatar from '../../../assets/icons/persona-icon.svg?react'
import { formatDate } from '../../../features/formatDate.ts'

interface CommentsProps {}

const Comments: React.FC<CommentsProps> = ({}) => {
  const { pathname } = useLocation()

  const id = pathname.split('/ad/')[1]?.split('/')[0]

  const { data } = useFetchComments(id)
  const comments = data?.comments || null
  const rating = data?.average_rating ? data.average_rating : null

  return (
    <section className="mb-24 flex max-w-container flex-col items-start justify-center gap-12">
      <section className="flex w-full flex-col items-start justify-center gap-6">
        <h3 className="text-h3 font-semibold text-grey-950">Відгуки покупців</h3>
        <hr className="w-full border-t border-grey-200" />
        <div className="flex items-center gap-6">
          <p className="text-h3">{rating ? rating : 'Завантаження рейтингу...'}/5.0</p>
          <StarRating rating={rating ? rating : 0} />
        </div>
        <p className="text-d1 text-grey-600">
          на базі {comments ? comments.length : 'Завантаження відгуків...'} відгуків
        </p>
      </section>
      <section className="flex w-full flex-col items-start justify-center gap-8">
        <h3 className="mb-12 text-h3 text-grey-950">Відгуки ({comments?.length})</h3>
        <section className="flex flex-col gap-8">
          {comments?.length ? (
            comments.map((review) => (
              <div key={review.product_id + review.id} className="flex flex-col gap-4">
                <StarRating rating={review.rating} />
                <div className="flex items-center justify-start gap-4">
                  <UserAvatar className="text-secondary-brown-700" />
                  <p className="text-b3 text-grey-600">{review.user_name}</p>
                </div>
                <p className="text-b3 text-grey-800"> {review.comment_text}</p>
                <p className="text-d1 text-grey-400">{formatDate(review.created_at, true)}</p>
              </div>
            ))
          ) : (
            <p className="text-d1 text-grey-600">Немає відгуків</p>
          )}
        </section>
      </section>
    </section>
  )
}

export default Comments
