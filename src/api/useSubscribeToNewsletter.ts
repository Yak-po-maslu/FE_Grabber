import { useMutation } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { TSubscribePayload } from '../types/SubscribePayloadTypes'
import { API_ENDPOINTS } from '../paths'

const useSubscribeToNewsletter = () => {
  const request = useBackendRequest()

  return useMutation({
    mutationFn: (data: TSubscribePayload) =>
      request<void, TSubscribePayload>({
        path: API_ENDPOINTS.SUBSCRIBE,
        method: 'POST',
        data,
      }),
  })
}

export default useSubscribeToNewsletter
