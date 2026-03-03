import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existing = get().cart.find((product) => product.id === product.id);

        if (existing) {
          set({
            cart: get().cart.map((product) =>
              product.id === product.id ? { ...product, qty: product.qty + 1 } : product,
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...product, qty: 1 }],
          });
        }
      },

      increaseQty: (id) =>
        set({
          cart: get().cart.map((product) =>
            product.id === id ? { ...product, qty: product.qty + 1 } : product,
          ),
        }),

      decreaseQty: (id) =>
        set({
          cart: get()
            .cart.map((product) => (product.id === id ? { ...product, qty: product.qty - 1 } : product))
            .filter((product) => product.qty > 0),
        }),

      removeFromCart: (id) =>
        set({
          cart: get().cart.filter((product) => product.id !== id),
        }),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" },
  ),
);
