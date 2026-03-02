import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existing = get().cart.find(
          (product) => product.id === product.id,
        );

        if (existing) {
          set({
            cart: get().cart.map((product) =>
              product.id === product.id
                ? { ...product, amount: product.amount + 1 }
                : product,
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...product, amount: 1 }],
          });
        }
      },

      removeFromCart: (id) =>
        set({
          cart: get().cart.filter((product) => product.id !== id),
        }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
