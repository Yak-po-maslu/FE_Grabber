import { useQuery } from '@tanstack/react-query'
import useBackendRequest from '../hooks/useBackendRequest'
import { API_ENDPOINTS } from '../paths'
import { TCategoryFiltersAndSort } from '../types/categoryTypes.ts'

const useFetchFiltersAndSort = (categoryId: string) => {
  const fetchData = useBackendRequest()

  return useQuery({
    queryKey: ['filters_and_sort', categoryId],
    queryFn: async () => {
      const data = await fetchData<TCategoryFiltersAndSort>({
        path: API_ENDPOINTS.ADS.filtersAndSort.replace('{category_id}', categoryId),
        method: 'GET',
      })

      return data
    },
  })
}

export default useFetchFiltersAndSort
