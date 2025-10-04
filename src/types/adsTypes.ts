// Базовий тип для оголошення
type TBaseAd = {
  title: string
  description: string
  images: string[]
  price: string
  location: string
  is_favorite: boolean
}

// Контактна інформація
type TContactInfo = {
  contact_name: string
  email: string
  phone: string
}

// Повна інформація про лістинг
export type TListingCreate = TBaseAd &
  TContactInfo & {
    id?: string
    product_id: string
    category: string
    status?: 'draft' | 'pending'
    user_id?: number
  }

export type TListingGet = TBaseAd &
  TContactInfo & {
    id: number
    product_id?: string
    category: string
    category_id: number
    status: string
    user_id: number
    created_at: string
    view_count: number
  }

// Спрощений тип для картки оголошення
export type AdType = TBaseAd & {
  id: string
}

// Тип для улюблених
export type TFavorite = {
  product_id: string
  favorite: boolean
}
