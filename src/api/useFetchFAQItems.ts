import { useQuery } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { API_ENDPOINTS } from '../paths'
import { TFAQItem } from '../types/FAQItemType'

const useFetchFAQItems = () => {
  const fetchFAQItems = useBackendRequest()

  return useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchFAQItems<TFAQItem[]>({ path: API_ENDPOINTS.ADS.faq, method: 'GET' }),
    retry: 1,
  })
}

export default useFetchFAQItems
