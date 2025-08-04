export type ReviewComment = {
  id: string
  product_id: string
  user_name: string
  rating: number
  comment_text: string
  created_at: string
}

export type TProductRating = {
  average_rating: number
  reviews: [
    {
      id: string
      product_id: string
      user_name: string
      rating: number
      comment_text: string
      created_at: string
    },
  ]
}
