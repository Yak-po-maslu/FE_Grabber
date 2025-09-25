export type TCategory = {
  id: number
  name: string
  description: string
  image: string
}
export type TPriceFilter = {
  min: number
  max: number
}
export type TLocationFilter = {
  type: string
}

export type TCategoryFilter = {
  id: number
  name: string
}
export type TSubcategory = {
  id: number
  name: string
  description: string
  image: string
  category: number
}
export type TSort = {
  value: string
  label: string
}

export type TCategoryFiltersAndSort = {
  category: TCategoryFilter
  base_filters: {
    price: TPriceFilter
    location: TLocationFilter
    subcategory: TCategory[]
  }
  attributes: []
  sort: TSort[]
}
