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
      //*cart drawer*/
      isCartOpen: false,

      openCart: () => set({ isCartOpen: true }),

      closeCart: () => set({ isCartOpen: false }),

      /*toast*/
      toast: null,

      showToast: (message) => {
        set({ toast: message });

        setTimeout(() => {
          set((state) => {
            if (state.toast === message) {
              return { toast: null };
            }
            return {};
          });
        }, 2000);
      },
    }),
    {
      name: "ui-storage",

      partialize: (state) => ({
        darkMode: state.darkMode,
      }),
    },
  ),
);
