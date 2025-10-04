import { useMutation, useQueryClient } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { API_ENDPOINTS } from '../paths'
import { TFavorite } from '../types/adsTypes'

const useToggleFavorite = () => {
  const fetchUserData = useBackendRequest()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ product_id, favorite }: TFavorite) => {
      if (favorite) {
        return fetchUserData({
          method: 'POST',
          path: API_ENDPOINTS.ADS.favorites,
          data: { product_id },
        })
      } else {
        return fetchUserData({
          method: 'DELETE',
          path: API_ENDPOINTS.ADS.removeFavorite.replace('{product_id}', product_id),
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

export default useToggleFavorite
