import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useListingsStore } from '../store/listingsStore'

export const useSyncQueryParamsWithUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { queryParams, setQueryParams } = useListingsStore()

  // 1. Ініціалізація store з URL
  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10

    const filters: Record<string, string | number> = {}
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'page' && key !== 'limit') {
        filters[key] = value
      }
    }

    setQueryParams({ page, limit, filters })
  }, [])

  // 2. Оновлення URL при зміні store
  useEffect(() => {
    const params: Record<string, string> = {
      page: String(queryParams.page ?? 1),
      limit: String(queryParams.limit ?? 10),
    }

    if (queryParams.filters) {
      Object.entries(queryParams.filters).forEach(([key, value]) => {
        params[key] = String(value)
      })
    }

    setSearchParams(params)
  }, [queryParams])
}
