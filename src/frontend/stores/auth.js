import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token:null,
      login: (userData,tokenData) => set({ user: userData,token:tokenData}),
      logout:()=>set({user:null,token:null})
    }),
    {
      name: 'AuthStore',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)