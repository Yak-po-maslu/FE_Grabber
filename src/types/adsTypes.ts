export type TAdsCreate = {
  id?: string
  product_id: string
  title: string
  description: string
  price: string
  status?: 'draft' | 'pending'
  category: string
  location: string
  contact_name: string
  user_id?: number
  email: string
  phone: string
  images: string[]
  is_favorite: boolean
}
