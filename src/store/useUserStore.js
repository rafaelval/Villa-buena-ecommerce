import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      shipping: {
        fullName: "",
        address: "",
        city: "",
      },

      payment: {
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      },

      setShipping: (data) =>
        set((state) => ({
          shipping: { ...state.shipping, ...data },
        })),

      setPayment: (data) =>
        set((state) => ({
          payment: { ...state.payment, ...data },
        })),

      hydrateFromAuth0: (user) =>
        set((state) => ({
          shipping: {
            ...state.shipping,
            fullName: state.shipping.fullName || user?.name || "",
          },
        })),
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),
    }),
    {
      name: "user-checkout-storage",
    },
  ),
);
