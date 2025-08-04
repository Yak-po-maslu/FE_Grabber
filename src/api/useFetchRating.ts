import { useQuery } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { API_ENDPOINTS } from '../paths'
import { TProductRating } from '../types/reviewCommentTypes'

const useFetchRating = (id: string) => {
  const fetchRating = useBackendRequest()

  const path = API_ENDPOINTS.ADS.rating.replace('{id}', id)

  return useQuery({
    queryKey: ['rating-product'],
    queryFn: () =>
      fetchRating<TProductRating>({
        path: path,
        method: 'GET',
      }),
    retry: 1,
  })
}

export default useFetchRating
