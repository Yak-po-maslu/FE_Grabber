import { useQuery } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { TSubcategory } from '../types/categoryTypes'
import { API_ENDPOINTS } from '../paths'

const useFetchSubcategories = () => {
  const fetchSubcategories = useBackendRequest()

  return useQuery({
    queryKey: ['subcategories'],
    queryFn: () => fetchSubcategories<TSubcategory[]>({ path: API_ENDPOINTS.ADS.subcategories }),
    retry: 1,
  })
}

export default useFetchSubcategories
