export type TAdImage = {
  id: string
  image: string
}

export type TAd = {
  id: string
  title: string
  description: string
  images: TAdImage[]
  price: string
  location: string
}
