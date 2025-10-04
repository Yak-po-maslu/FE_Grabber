import { useQuery } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { API_ENDPOINTS } from '../paths'
import { TListing } from '../types/adsTypes'

const useFetchPopularProducts = () => {
  const backendRequest = useBackendRequest()

  return useQuery({
    queryFn: () => backendRequest<TListing[]>({ path: API_ENDPOINTS.ADS.popularProducts }),
    queryKey: ['main'],
  })
}

export default useFetchPopularProducts
