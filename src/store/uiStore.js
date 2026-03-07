import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
  persist(
    (set) => ({
      /*darkmode*/
      darkMode: false,
      toggleDarkMode: () =>
        set((state) => ({
          darkMode: !state.darkMode,
        })),

      /*cart drawer*/
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      /*toast*/
      toast: null,
      toastKey: 0,

      showToast: (message) => {
        set((state) => ({
          toast: message,
          toastKey: state.toastKey + 1,
        }));
      },

      hideToast: () => set({ toast: null }),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        darkMode: state.darkMode,
      }),
    },
  ),
);
