import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      login: (state) => set({ user: state}),
      logout:()=>set({user:null})
    }),
    {
      name: 'AuthStore',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)