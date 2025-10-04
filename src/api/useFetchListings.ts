import { useQuery } from '@tanstack/react-query'
import useBackendRequest, { TQueryParams } from '../hooks/useBackendRequest'
import { API_ENDPOINTS } from '../paths'
import { TListingGet } from '../types/adsTypes'

const useFetchListings = (queryParams?: TQueryParams) => {
  const fetchListings = useBackendRequest()

  return useQuery({
    queryKey: ['listings', JSON.stringify(queryParams)],
    queryFn: () =>
      fetchListings<TListingGet>({
        path: API_ENDPOINTS.ADS.listings,
        queryParams,
      }),
  })
}

export default useFetchListings
