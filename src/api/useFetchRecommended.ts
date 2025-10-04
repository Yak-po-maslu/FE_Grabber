import { useQuery } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { API_ENDPOINTS } from '../paths'
import { TListing } from '../types/adsTypes'

const useFetchRecommended = () => {
  const fetchAds = useBackendRequest()

  return useQuery({
    queryKey: ['recommended-ads'],
    queryFn: () =>
      fetchAds<TListing[]>({
        path: API_ENDPOINTS.ADS.recommendations,
        method: 'GET',
      }),
    retry: 1,
  })
}

export default useFetchRecommended
