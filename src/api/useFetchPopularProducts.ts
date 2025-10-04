import { useQuery } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { API_ENDPOINTS } from '../paths'
import { TListingGet } from '../types/listingsTypes'

const useFetchPopularProducts = () => {
  const backendRequest = useBackendRequest()

  return useQuery({
    queryFn: () => backendRequest<TListingGet[]>({ path: API_ENDPOINTS.ADS.popularProducts }),
    queryKey: ['main'],
  })
}

export default useFetchPopularProducts
