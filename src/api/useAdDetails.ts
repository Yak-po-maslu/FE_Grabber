import { useQuery } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { TListingCreate } from '../types/listingsTypes.ts'
import { API_ENDPOINTS } from '../paths'

const useAdDetails = (adId: string) => {
  const fetchUserData = useBackendRequest()

  return useQuery({
    queryKey: ['ad-details', adId],
    queryFn: async () => {
      const res = await fetchUserData<{ ad: TListingCreate }>({
        path: API_ENDPOINTS.AD.details.replace('{ad_id}', adId),
        method: 'GET',
      })

      return res.ad
    },
  })
}

export default useAdDetails
