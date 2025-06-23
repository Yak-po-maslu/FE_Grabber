export type TAdsCreate = {
  title: string
  description: string
  price: string
  status?: 'draft' | 'pending'
  category: string
  location: string
  contact_name: string
  email: string
  phone: string
  images: string[]
}
