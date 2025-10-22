import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  id: string
  image: string
  title: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  totalNumber: number
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalNumber: 0,

      addToCart: (newItem) => {
        const items = get().items
        const existing = items.find((item) => item.id === newItem.id)
        let updatedItems

        if (existing) {
          updatedItems = items.map((item) =>
            item.id === newItem.id
              ? {
                  ...item,
                  quantity: item.quantity + newItem.quantity,
                }
              : item,
          )
        } else {
          updatedItems = [...items, newItem]
        }

        const totalNumber = updatedItems.reduce((sum, item) => sum + item.quantity, 0)

        set({ items: updatedItems, totalNumber })
      },

      removeFromCart: (id) => {
        const currentItems = get().items.map((item) => {
          if (item.id === id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 }
            }

            return null
          }

          return item
        })

        const filtered = currentItems.filter(Boolean) as CartItem[]
        const totalNumber = filtered.reduce((sum, item) => sum + item.quantity, 0)
        set({ items: filtered, totalNumber })
      },

      clearCart: () => set({ items: [], totalNumber: 0 }),
    }),
    {
      name: 'cart-storage',
    },
  ),
)

export default useCartStore
