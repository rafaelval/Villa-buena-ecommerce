import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existing = get().cart.find(p => p.id === product.id);

        if (existing) {
          set({
            cart: get().cart.map(p =>
              p.id === product.id
                ? { ...p, qty: p.qty + 1 }
                : p
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
          cart: get().cart.map(p =>
            p.id === id ? { ...p, qty: p.qty + 1 } : p
          ),
        }),

      decreaseQty: (id) =>
        set({
          cart: get().cart
            .map(p =>
              p.id === id ? { ...p, qty: p.qty - 1 } : p
            )
            .filter(p => p.qty > 0),
        }),

      removeFromCart: (id) =>
        set({
          cart: get().cart.filter(p => p.id !== id),
        }),
    }),
    { name: "cart-storage" }
  )
);