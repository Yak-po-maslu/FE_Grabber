import { useMutation } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { API_ENDPOINTS } from '../paths'

const useAdsCreate = () => {
  const fetchLogin = useBackendRequest()

  return useMutation({
    mutationFn: async (data: FormData) =>
      await fetchLogin({
        path: API_ENDPOINTS.ADS.create,
        method: 'POST',
        data,
        contentType: 'multipart/form-data ',
      }),
  })
}

export default useAdsCreate
