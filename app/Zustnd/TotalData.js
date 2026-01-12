import { create } from 'zustand'

export const useData = create((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
}))
