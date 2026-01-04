import { create } from 'zustand'
import { TQueryParams } from '../hooks/useBackendRequest'

interface ListingsStore {
  queryParams: TQueryParams
  setQueryParams: (params: Partial<TQueryParams>) => void
  resetQueryParams: () => void
}

export const useListingsStore = create<ListingsStore>((set) => ({
  queryParams: { page: 1, limit: 10 },
  setQueryParams: (params) =>
    set((state) => ({
      queryParams: { ...state.queryParams, ...params },
    })),
  resetQueryParams: () => set({ queryParams: { page: 1, limit: 10 } }),
}))
