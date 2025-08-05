import { create } from 'zustand'

type CartItem = {
  id: string
  title: string
  price: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  addToCart: (item: CartItem) => void
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (newItem) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === newItem.id)

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item,
          ),
        }
      }

      return { items: [...state.items, newItem] }
    }),
}))

export default useCartStore
