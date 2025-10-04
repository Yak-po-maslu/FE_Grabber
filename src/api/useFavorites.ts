import { useQuery } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { API_ENDPOINTS } from '../paths'
import { AdType } from '../types/adsTypes'

const useFavorites = () => {
  const fetchUserData = useBackendRequest()

  return useQuery({
    queryKey: ['favorites'],
    queryFn: () =>
      fetchUserData<AdType[]>({
        path: API_ENDPOINTS.ADS.getFavorites,
        method: 'GET',
      }),
  })
}

export default useFavorites
