export type TCategory = {
  id: number
  name: string
  description: string
  image: string
}

export type TSubcategory = {
  id: number
  name: string
  description: string
  image: string
  category: number
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

export type TAttributeFilter = {
  id: number
  name: string
  slug: string
  type: string
  unit: string
  is_filterable: boolean
  sort_order: number
  options: []
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
    subcategory: {
      id: number
      name: string
    }[]
  }
  attributes: TAttributeFilter[]
  sort: TSort[]
}
