import { useQuery } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { TCategory } from '../types/categoryTypes'
import { API_ENDPOINTS } from '../paths'

const useFetchCategories = () => {
  const fetchCategories = useBackendRequest()

  return useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchCategories<TCategory[]>({ path: API_ENDPOINTS.ADS.categoriesList }),
    retry: 1,
  })
}

export default useFetchCategories
