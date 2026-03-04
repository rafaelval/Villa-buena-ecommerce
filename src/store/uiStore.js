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

      /*toast*/
      toast: null,

      showToast: (message) => {
        set({ toast: message });

        setTimeout(() => {
          set({ toast: null });
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
